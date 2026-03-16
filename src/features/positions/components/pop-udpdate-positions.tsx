"@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEdit, FiUser } from "react-icons/fi";

export function PopUpdatePositions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FiEdit className="cursor-pointer hover:text-indigo-500" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <FiUser className="text-blue-500" />
            Mise à jours du poste
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Modifier les informations du poste puis cliquez sur
            Enregistrer.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-4">
          <FieldGroup>

            <Field className="space-y-2">
              <Label>Nom</Label>
              <Input defaultValue="Attaquant" />
            </Field>

          
          </FieldGroup>

          <DialogFooter className="pt-6 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>

            <Button className="bg-black hover:bg-green-400"> Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
