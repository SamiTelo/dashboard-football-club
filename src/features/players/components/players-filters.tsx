import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PlayersFilters() {
  return (
    <div className="p-5 border-b border-gray-100">
      <h3 className="text-lg font-medium mb-4">Search Filter</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Select teams */}
        <Select>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Choisir une équipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="real-madrid">Real Madrid</SelectItem>
            <SelectItem value="barcelona">FC Barcelone</SelectItem>
            <SelectItem value="psg">Football Club</SelectItem>
          </SelectContent>
        </Select>

        {/* Select positions */}
        <Select>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Choisir une position" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="goalkeeper">Gardien</SelectItem>
            <SelectItem value="defender">Défenseur</SelectItem>
            <SelectItem value="midfielder">Milieu</SelectItem>
            <SelectItem value="forward">Attaquant</SelectItem>
          </SelectContent>
        </Select>

        {/* Select status */}
        <Select>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Choisir un status" />
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
