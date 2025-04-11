import "./globals.css";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/home">Head</a>
            <a href="/about">About us</a>
            <a href="/products/1">First product</a>
          </nav>
        </header>

        <main>
          
          {children}

        </main>

        <footer>
          @2025 My-site
        </footer>
      </body>
    </html>
  );
}
