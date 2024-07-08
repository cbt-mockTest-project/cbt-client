'use client';

import { useCallback, useEffect, useRef } from 'react';

import _ from 'lodash';

import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { RouterEvent } from 'AppRouterContext';

const coreMethodFields = [
  'push',
  'replace',
  'refresh',
  'back',
  'forward',
] as const;

const routerEvents: Record<
  RouterEvent,
  Array<(url: string, options?: any) => void>
> = {
  routeChangeStart: [],
  routeChangeComplete: [],
};

/**
 * @see https://velog.io/@khxxjxx/NextJS-14-router.events
 */
const AppRouterConsumer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const index = useRef(0);
  const routeEventInfo = useRef<{
    direction: 'back' | 'forward';
    url: string;
  }>();

  const events: AppRouterInstance['events'] = {
    on(event: RouterEvent, cb: (url: string, options?: any) => void) {
      routerEvents[event] = [...routerEvents[event], cb];
    },
    off(event: RouterEvent, cb: (url: string, options?: any) => void) {
      routerEvents[event] = _.without(routerEvents[event], cb);
    },
  };

  function proxy(
    router: AppRouterInstance,
    field: (typeof coreMethodFields)[number]
  ) {
    const method = router[field];

    Object.defineProperty(router, field, {
      get: () => {
        return async (url: string, options?: any) => {
          try {
            if (!_.isEmpty(routerEvents.routeChangeStart)) {
              const promiseList = routerEvents.routeChangeStart.map((cb) =>
                cb(url, options)
              );
              await Promise.all(promiseList);
            }
            method(url, options);
          } catch (e) {
            console.error(e);
          }
        };
      },
    });
  }

  const eventListenerHandler = useCallback(
    (listener: EventListenerOrEventListenerObject) => async (event: Event) => {
      const eventListener =
        'handleEvent' in listener ? listener.handleEvent : listener;

      if (event.type === 'popstate') {
        if (!_.isEmpty(routerEvents.routeChangeStart)) {
          const historyIndex = window.history.state?.index ?? 0;
          const routeInfo = routeEventInfo.current;

          if (routeInfo && historyIndex === index.current) {
            try {
              const { url, direction } = routeInfo;

              const promiseList = routerEvents.routeChangeStart.map((cb) =>
                cb(url, event)
              );
              await Promise.all(promiseList);

              return window.history[direction]();
            } catch (e) {
              routeEventInfo.current = undefined;
              return console.error(e);
            }
          } else if (routeInfo) {
            routeEventInfo.current = undefined;
          } else {
            const backEvent = index.current > historyIndex;
            const forwardEvent = index.current < historyIndex;

            const pathname = window.location.pathname;
            const query = window.location.search;
            const url = pathname + query;

            routeEventInfo.current = {
              direction: backEvent ? 'back' : 'forward',
              url,
            };
            if (backEvent) window.history.forward();
            else if (forwardEvent) window.history.back();

            return;
          }
        }
      }

      eventListener(event);
    },
    []
  );

  useEffect(() => {
    const originAddEventListener = window.addEventListener;
    const originRemoveEventListener = window.removeEventListener;

    const eventListeners = new Map();

    const addListener = function <K extends keyof WindowEventMap>(
      type: K,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      const wrappedListener = eventListenerHandler(listener);
      eventListeners.set(listener, wrappedListener);
      originAddEventListener(type, wrappedListener, options);
    };

    const removeListener = function <K extends keyof WindowEventMap>(
      type: K,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      const wrappedListener = eventListeners.get(listener);
      if (wrappedListener) {
        originRemoveEventListener(type, wrappedListener, options);
        eventListeners.delete(listener);
      }
    };

    window.addEventListener = addListener;
    window.removeEventListener = removeListener;

    return () => {
      window.addEventListener = originAddEventListener;
      window.removeEventListener = originRemoveEventListener;
    };
  }, [eventListenerHandler]);

  useEffect(() => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    index.current = window.history.state?.index ?? 0;

    window.history.pushState = (
      data: any,
      _: string,
      url?: string | URL | null
    ) => {
      const historyIndex = window.history.state?.index ?? 0;
      const nextIndex = historyIndex + 1;
      const state = { ...data, index: nextIndex };

      index.current = nextIndex;

      return History.prototype.pushState.apply(window.history, [state, _, url]);
    };
    window.history.replaceState = (
      data: any,
      _: string,
      url?: string | URL | null
    ) => {
      const historyIndex = window.history.state?.index ?? 0;
      const state = { ...data, index: historyIndex };

      index.current = historyIndex;

      return History.prototype.replaceState.apply(window.history, [
        state,
        _,
        url,
      ]);
    };

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return (
    <AppRouterContext.Consumer>
      {(router) => {
        if (router) {
          router.events = events;
          coreMethodFields.forEach((field) => proxy(router, field));
        }
        return children;
      }}
    </AppRouterContext.Consumer>
  );
};

export default AppRouterConsumer;
