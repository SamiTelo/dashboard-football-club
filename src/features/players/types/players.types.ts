export type Status = "Active" | "Inactive" | "Pending";

export interface Player {
  id: number;
  name: string;
  lastname: string;
  team: "Arsenal" | "Fc barcelone" | "Real Madrid" | "PSG" | "Football Club";
  position: "Defenseur" | "Attaquant" | "Milieu" | "Ailier";
  status: Status;
  avatar?: string;
}