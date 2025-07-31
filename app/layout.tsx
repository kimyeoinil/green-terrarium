import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "초록빛 테라리움 - 실내동물원",
  description: "도시 속 작은 정글, 가족과 함께하는 생태 체험 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}