import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookIcon, FileText, Megaphone, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: siteConfig.name,
    },
    links: [
      {
        icon: <BookIcon />,
        text: "Docs",
        url: "/docs",
        secondary: false,
      },
      {
        type: "custom",
        on: "nav",
        children: null, // home layout overrides this with NavbarMenu
      },
      {
        icon: <Sparkles />,
        text: "Showcase",
        url: "/showcase",
        secondary: true,
      },
      {
        icon: <FileText />,
        text: "Changelog",
        url: "/changelog",
        secondary: true,
      },
      {
        icon: <Megaphone />,
        text: "Announcements",
        url: "/blog",
        secondary: true,
      },
    ],
  };
}
