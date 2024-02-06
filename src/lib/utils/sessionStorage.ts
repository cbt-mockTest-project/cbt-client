import { isServer } from './utils';

export class SessionStorage {
  get(key: string) {
    if (isServer()) return;
    const getItem = sessionStorage.getItem(key);
    return getItem !== null ? JSON.parse(getItem) : '';
  }
  set(key: string, value: any) {
    if (isServer()) return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  remove(key: string) {
    if (isServer()) return;
    sessionStorage.removeItem(key);
  }
  clear() {
    if (isServer()) return;
    sessionStorage.clear();
  }
}
