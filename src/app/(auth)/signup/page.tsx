import { SignupForm } from "./signup-form";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata = { title: "Регистрация — AI Email Generator" };

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Mail className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Создать аккаунт</h1>
        <p className="text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-foreground">
            Войти
          </Link>
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
