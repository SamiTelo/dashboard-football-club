import { FiDownload} from "react-icons/fi";
import { PopAddUsers } from "./pop-add-users";



interface PlayersActionsProps {
  onExport: () => void;
}

export function UserActions({
  onExport,
}: PlayersActionsProps) {
  return (
    <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <select className="border border-gray-200 rounded-md p-1">
        <option>10</option>
      </select>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search"
          defaultValue=""
          className="border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:border-green-300"
        />

        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
        >
          <FiDownload /> Exporter
        </button>
        
        <PopAddUsers/>
      </div>
    </div>
  );
}