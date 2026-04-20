"use client"

import * as React from "react"
import {
  Footprints,
  Home,
  Shield,
  User,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { NavMain, type NavItem } from "@/features/dashbaord/components/nav-main"
import { NavLogo } from "@/features/dashbaord/components/nav-logo"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/features/dashbaord/components/ui/sidebar"

import { NavInfo } from "@/features/dashbaord/components/nav-info"
import { NavHeader } from "@/features/dashbaord/components/nav-header"

/* -------------------------------------------------------------------------- */
/*                              TYPES 
/* -------------------------------------------------------------------------- */

type HeaderItem = {
  name: string
  url: string
  icon: LucideIcon
}

/* -------------------------------------------------------------------------- */
/*                                DATA 
/* -------------------------------------------------------------------------- */


const data: {
  logo: { name: string; src: string }[]
  header: HeaderItem[]
  navMain: NavItem[]
} = {
  logo: [
    {
      name: "Football Club",
      src: "/assets/logo.webp",
    },
  ],

  header: [
    {
      name: "Accueil",
      url: "/dashboard",
      icon: Home,
    },
  ],

  navMain: [
    {
      title: "Joueurs",
      url: "/dashboard/players",
      icon: UsersRound,
      isActive: true,
      items: [
        {
          title: "Listes",
          url: "/dashboard/players",
        },
      ],
    },
    {
      title: "Equipes",
      url: "/dashboard/teams",
      icon: Shield,
      items: [
        {
          title: "Listes",
          url: "/dashboard/teams",
        },
      ],
    },
    {
      title: "Positions",
      url: "/dashboard/positions",
      icon: Footprints, 
      items: [
        {
          title: "Listes",
          url: "/dashboard/positions",
        },
      ],
    },
    {
      title: "Gestion utilisateurs",
      url: "/dashboard/users",
      icon: User,
      items: [
        {
          title: "Listes",
          url: "/dashboard/users",
        },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/*                           COMPONENT
/* -------------------------------------------------------------------------- */

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo logo={data.logo} />
      </SidebarHeader>

      <SidebarContent>
        <NavHeader header={data.header} />
        <NavMain items={data.navMain} />
        <NavInfo />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}