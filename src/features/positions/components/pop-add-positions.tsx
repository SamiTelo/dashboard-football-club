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
import { FiPlus, FiUser } from "react-icons/fi";

export function PopAddPositions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-black text-white hover:bg-green-500 transition shadow-md">
          <FiPlus className="text-lg" />
          Ajouter un poste
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <FiUser className="text-green-500" />
            Ajouter un nouveau poste
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Remplissez les informations ci-dessous puis cliquez sur
            enregistrer.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-4">
          <FieldGroup>
            

            <Field className="space-y-2">
              <Label>Nom</Label>
              <Input placeholder="Attaquants" />
            </Field>

          </FieldGroup>

          <DialogFooter className="pt-6 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>

            <Button className="bg-black hover:bg-green-400">
              Enregistrer un joueur
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
