import { LoginForm } from "./login-form";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata = { title: "Вход — AI Email Generator" };

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Mail className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Войти в аккаунт</h1>
        <p className="text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link href="/signup" className="underline underline-offset-4 hover:text-foreground">
            Зарегистрироваться
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
