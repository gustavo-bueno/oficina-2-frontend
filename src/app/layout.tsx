import { Poppins } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ELLP UTFPR-CP",
  description:
    "Plataforma para gerência de certificados do Projeto ELLP UTFPR (CP)",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
      {/* <ToastContainer /> */}
    </html>
  );
}
