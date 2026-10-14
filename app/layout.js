import { DM_Sans, Teko } from "next/font/google";
import MotionEffects from "@/components/Animations/MotionEffects";
import Chatbot from "@/components/Chatbot/Chatbot";
import Preloader from "@/components/Preloader/Preloader";
import "@/components/Animations/motion-effects.css";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const teko = Teko({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-teko",
});

export const metadata = {
  title: "Mobile Tyre Fitting in Ilford | Car Care Solutions Services",
  description:
    "We deliver high-quality tyres, expert puncture repair, complete servicing, and brake system maintenance to keep you driving with confidence.",
  icons: {
    icon: "/images/road-smart-tyre-logo-1.png",
    apple: "/images/road-smart-tyre-logo-1.png",
  },
  metadataBase: new URL("https://roadsmarttyres.co.uk"),
  openGraph: {
    siteName: "Road Smart Tyre",
    type: "website",
    title: "Mobile Tyre Fitting in Ilford | Car Care Solutions Services",
    description:
      "We deliver high-quality tyres, expert puncture repair, complete servicing, and brake system maintenance to keep you driving with confidence.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${teko.variable}`}>
        <Preloader />
        <MotionEffects />
        <Chatbot />
        {children}
      </body>
    </html>
  );
}
