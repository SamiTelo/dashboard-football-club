"use client";

import * as React from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/features/dashbord/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/features/dashbord/components/ui/sidebar";

interface LogoItem {
  name: string;
  src: string; // chemin vers ton image
}

interface NavLogoProps {
  logo: LogoItem[];
}

export function NavLogo({ logo }: NavLogoProps) {
  const [active] = React.useState(logo[0]);

  if (!active) return null;

  return (
    <SidebarMenu className="bg-gray-100 rounded-2xl">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square w-8 h-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <Image
                  src={active.src}
                  alt={active.name}
                  width={32}
                  height={32}
                  className="object-contain rounded-2xl"
                />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{active.name}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}