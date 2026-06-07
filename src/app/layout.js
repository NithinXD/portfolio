import './globals.css';

export const metadata = {
  title: "Nithin D — Portfolio",
  description: "Interactive Pokémon-themed portfolio of Nithin D",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
