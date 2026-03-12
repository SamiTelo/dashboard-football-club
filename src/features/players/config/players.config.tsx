import { ReactNode } from "react";
import { FiUsers } from "react-icons/fi";
import { GiFootTrip } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";

export const teamLogos = {
  Arsenal: "/assets/teams/arsenal.png",
  "Fc barcelone": "/assets/teams/fc-barcelona.png",
  "Real Madrid": "/assets/teams/real-madrid.png",
  PSG: "/assets/teams/psg.png",
  "Football Club": "/assets/logo.png",
};

export const featureIconMap: Record<
  string,
  { icon: ReactNode; bgColor: string }
> = {
  "Total joueurs": {
    icon: <FiUsers className="text-purple-500" />,
    bgColor: "bg-purple-100",
  },
  "Total equipes": {
    icon: <GoTrophy className="text-red-500" />,
    bgColor: "bg-red-100",
  },
  "Total joueurs actifs": {
    icon: <FiUsers className="text-green-500" />,
    bgColor: "bg-green-100",
  },
  "Total positions": {
    icon: <GiFootTrip className="text-orange-500" />,
    bgColor: "bg-orange-100",
  },
};