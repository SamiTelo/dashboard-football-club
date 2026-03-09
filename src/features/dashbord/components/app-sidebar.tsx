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

import { NavMain, type NavItem } from "@/features/dashbord/components/nav-main"
import { NavLogo } from "@/features/dashbord/components/nav-logo"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/features/dashbord/components/ui/sidebar"

import { NavInfo } from "@/features/dashbord/components/nav-info"
import { NavHeader } from "@/features/dashbord/components/nav-header"

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
      src: "/assets/logo.png",
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
      title: "Utilisateurs",
      url: "/dashboard/users",
      icon: User,
      items: [
        {
          title: "Listes",
          url: "/dashboard/users",
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