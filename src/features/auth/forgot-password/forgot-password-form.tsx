import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6 my-8 md:my-0", className)} {...props}>
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold"> Mot de passe<span className="text-green-400"> oublié ?</span></h1>
          <p className="text-muted-foreground text-xs mt-2">
           Renseignez votre adresse e-mail ci-dessous et recevez instantanément un lien sécurisé pour réinitialiser votre mot de passe 
          </p>
        </div>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="mail@example.com" required />
        </Field>

        {/* Bouton Login */}
        <Field>
          <Button type="submit" className="bg-green-400">Send recovery link </Button>
        </Field>
        
        <Field>
          <FieldDescription className="text-center">
            Remember you password?{" "}
            <a href="/login" className="underline underline-offset-4 text-green-400">
              Login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
