import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserFilters() {
  return (
    <div className="p-5 border-b border-gray-100">
      <h3 className="text-lg font-medium mb-4">Search Filter</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Select teams */}
        <Select>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Choisir un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="superAdmin">SuperAdmin</SelectItem>
            <SelectItem value="utilisateur">Utilisateur</SelectItem>
          </SelectContent>
        </Select>

        {/* Select positions */}
        <Select>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Choisir la vérification" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
          </SelectContent>
        </Select>

        {/* Select status */}
        <Select>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Choisir le status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
