interface KakaoShareArgs {
  title: string;
  imageUrl?: string;
  url: string;
  description: string;
}

export const kakaoShare = ({
  title,
  imageUrl,
  url,
  description,
}: KakaoShareArgs) => {
  if (window.Kakao.Link) {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
      success: (res: any) => console.log(res),
      fail: (res: any) => console.log(res),
    });
  }
};
