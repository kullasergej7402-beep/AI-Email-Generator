import { Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t py-6">
      <div className="container flex max-w-screen-2xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>AI Email Generator</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Built with Next.js, Supabase & Anthropic
        </p>
      </div>
    </footer>
  );
}
