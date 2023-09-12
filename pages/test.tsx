import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Image } from 'antd';
import WithHead from '@components/common/head/WithHead';

const Test: NextPage = () => {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const addedNode = mutation.addedNodes[i] as HTMLElement;
            console.log(addedNode);
            if (
              addedNode.nodeName === 'IFRAME' &&
              addedNode.getAttribute('src')?.includes('test')
              // addedNode.getAttribute('src')?.includes('googleads')
            ) {
              // 아이프레임에 relative position 설정
              addedNode.style.position = 'relative';

              // 오버레이 생성
              const overlay = document.createElement('div');
              overlay.style.position = 'absolute';
              overlay.style.top = '0';
              overlay.style.left = '0';
              overlay.style.width = '100%';
              overlay.style.height = '100%';
              overlay.style.zIndex = '10';
              overlay.style.cursor = 'not-allowed';
              overlay.onclick = (e) => {
                e.preventDefault();
                alert('클릭이 차단되었습니다.');
              };

              addedNode.parentElement?.insertBefore(overlay, addedNode);
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <iframe
      width={1000}
      height={1000}
      src="http://192.168.219.102:3000/test2"
    />
  );
};

export default Test;
