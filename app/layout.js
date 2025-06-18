import "./globals.css";
import Navigation from "@/app/components/Navigation";
import Footer from "./components/Footer";
import { Provider } from "./components/SessionProvider";
import { Suspense } from "react";
import Loader from "./components/ui/Loader";
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
  title: "NadaMart",
  description: "nothing for sale, everything for free",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" />
      <body>
        <Provider>
          <Navigation />
          <Suspense fallback={<Loader />}>
            <div className="flex-1">{children}</div>
          </Suspense>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
