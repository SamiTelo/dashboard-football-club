import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6 my-8 md:my-0", className)} {...props}>
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Réinitialiser <br/>le<span className="text-green-400"> mot de passe ?</span></h1>
          <p className="text-muted-foreground text-xs mt-2">
          Pour réinitialiser votre mot de passe, veuillez saisir votre nouveau mot de passe dans le champ ci-dessous, puis confirmez-le afin de valider la modification.
          </p>
        </div>

        {/* Email */}
         <Field>
            <FieldLabel htmlFor="new-password">Nouveaux mot de passe</FieldLabel>
            <Input
              id="new-password"
              type="new-password"
              placeholder="••••••••"
              required
            />
          </Field>

           <Field>
            <FieldLabel htmlFor="confirm-password">Confirmer mot de passe</FieldLabel>
            <Input
              id="confirm-password"
              type="confirm-password"
              placeholder="••••••••"
              required
            />
          </Field>
          
        {/* Bouton Login */}
        <Field>
          <Button type="submit" className="bg-green-400">Change password </Button>
        </Field>
        
        <Field>
          <FieldDescription className="text-center text-xs">
            si vous n&apos;avez pas demandé de lien de récupération de mot de passe, <br/>veuillez l&apos;ignorer.{" "}
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
