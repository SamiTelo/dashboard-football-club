"use client"

import {
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
} from "@/features/dashbord/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/features/dashbord/components/ui/sidebar"

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
        {header.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
