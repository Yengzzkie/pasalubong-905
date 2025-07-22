import "./globals.css";
import Navigation from "@/app/components/Navigation";
import Footer from "./components/Footer";
import { Provider } from "./components/SessionProvider";
import { Suspense } from "react";
import { Great_Vibes, Raleway } from 'next/font/google';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes'
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway'
});

export const metadata = {
  title: "Pasalubong905",
  description: "Authentic Filipino Restaurant",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" />
      <body>
        <Provider>
          <Navigation />
          <Suspense>
            <div className="flex-1">{children}</div>
          </Suspense>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
