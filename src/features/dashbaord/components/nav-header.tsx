"use client"

import { type LucideIcon } from "lucide-react"

import {
  DropdownMenu,
} from "@/features/dashbaord/components/ui/dropdown-menu"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/features/dashbaord/components/ui/sidebar"

export function NavHeader({
  header,
}: {
  header: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Tableau de bord</SidebarGroupLabel>

      <SidebarMenu>
        {header.map((item) => {
          const isAccueil = item.name === "Accueil"

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={isAccueil ? "hover:bg-gray-100 cursor-default" : ""}
              >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>

              <DropdownMenu />
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}