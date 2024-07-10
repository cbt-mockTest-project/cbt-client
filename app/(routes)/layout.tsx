import QueryProvider from '#app/_providers/QueryProvider';
import StoreProvider from '#app/_providers/StoreProvider';
import StyledComponentsRegistry from '#app/_providers/StyledComponentsRegistry';

export const metadata = {
  title: '모두CBT | 암기짱 공유 서비스',
  description:
    '미니인턴은 실제 기업 프로젝트를 온라인으로 수행하며, 2주 만에 실무경험을 쌓고 취업하는 인재매칭 서비스입니다.',
  keywords: '인턴, 채용, 취업, 헤드헌팅, M클래스, 교육, 실무, 기업, 과제',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <StoreProvider>
        <QueryProvider>
          <StyledComponentsRegistry>
            <body>{children}</body>
          </StyledComponentsRegistry>
        </QueryProvider>
      </StoreProvider>
    </html>
  );
}
