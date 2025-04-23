
import "./globals.css";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Theme>
        <body style={{height: '100vh'}}>
          {children}
        </body>
      </Theme>
    </html>
  );
}
