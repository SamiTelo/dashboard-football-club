export type UserRole = "Admin" | "SuperAdmin" | "Utilisateur"

export type UserStatus = "Active" | "Inactive" 

export interface UserListItem {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  isVerified: boolean; 
  createdAt: string
  updatedAt: string
}
