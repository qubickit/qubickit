import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: "custom",
          on: "nav",
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>Documentation</NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/docs">Docs home</NavbarMenuLink>
                <NavbarMenuLink href="/docs/clients">Clients</NavbarMenuLink>
                <NavbarMenuLink href="/docs/contracts">
                  Contracts
                </NavbarMenuLink>
                <NavbarMenuLink href="/docs/broadcast">
                  Broadcasting
                </NavbarMenuLink>
                <NavbarMenuLink href="/docs/crypto">
                  Crypto & Signing
                </NavbarMenuLink>
                <NavbarMenuLink href="/docs/types">Types</NavbarMenuLink>
                <NavbarMenuLink href="/docs/reference">
                  Reference
                </NavbarMenuLink>
                <NavbarMenuLink href="/docs/examples">Examples</NavbarMenuLink>
                <NavbarMenuLink href="/docs/testing">Testing</NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
