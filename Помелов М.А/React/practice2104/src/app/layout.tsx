import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import '../app/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Theme>
        <body>
          {children}
        </body>
      </Theme>
    </html>
  );
}
