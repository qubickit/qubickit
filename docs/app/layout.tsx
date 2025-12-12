import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
});

const docsUrl = new URL(siteConfig.docsPath, siteConfig.url);

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: docsUrl.toString(),
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: docsUrl.toString(),
    siteName: siteConfig.name,
    images: [
      {
        url: "/og/docs/index/image.png",
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og/docs/index/image.png"],
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
