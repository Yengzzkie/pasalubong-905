import "./globals.css";
import Navigation from "@/app/components/Navigation";
import Footer from "./components/Footer";
import { Provider } from "./components/SessionProvider";
import { Suspense } from "react";
import Loader from "./components/ui/Loader";

export const metadata = {
  title: "NadaMart",
  description: "nothing for sale, everything for free",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" />
      <body className={`lg:px-40`}>
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
