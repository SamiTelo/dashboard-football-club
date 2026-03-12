export type UserStatus = "Active" | "Inactive" | "Pending";

export type UserRole =
  | "Maintainer"
  | "Subscriber"
  | "Editor"
  | "Author"
  | "Admin";

export type UserPlan = "Basic" | "Team" | "Enterprise" | "Company";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
  billing: string;
  status: UserStatus;
}