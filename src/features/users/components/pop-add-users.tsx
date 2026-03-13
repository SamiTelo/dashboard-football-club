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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PopAddUsers() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-black text-white hover:bg-green-500 transition shadow-md">
          <FiPlus className="text-lg" />
          Ajouter un utilisateur
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <FiUser className="text-green-500" />
            Ajouter un nouveau utilisateur
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Remplissez les informations utilisateur puis cliquez sur
            enregistrer.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-4">
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 ">
              <Field className="space-y-2">
                <Label>Nom</Label>
                <Input placeholder="Ex: Devonne " />
              </Field>

              <Field className="space-y-2">
                <Label>Prénom</Label>
                <Input placeholder="Ex: Wallbridge" />
              </Field>
            </div>

            <Field className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="example@gmail.com" />
            </Field>

            {/* Select role */}
            <Field className="space-y-2">
              <Label>Rôle</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un rôle" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superAdmin">SuperAdmin</SelectItem>
                  <SelectItem value="utilisateur">Utilisateur</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Select status */}
            <Field className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="real-madrid">Active</SelectItem>
                  <SelectItem value="barcelona">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
