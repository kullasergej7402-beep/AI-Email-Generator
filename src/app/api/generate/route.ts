import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getEmailProvider } from "@/lib/ai";
import { normalizeError } from "@/lib/errors";

const schema = z.object({
  topic: z.string().min(3, "Минимум 3 символа").max(500, "Максимум 500 символов"),
  tone: z.enum(["formal", "friendly", "persuasive", "casual", "professional"]),
  length: z.enum(["short", "medium", "long"]),
});

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "Необходима авторизация" }, { status: 401 });
    }

    const body = await request.json() as unknown;
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Некорректные данные" }, { status: 400 });
    }

    const provider = getEmailProvider();
    const result = await provider.generate(parsed.data);

    const { error: dbError } = await supabase.from("email_generations").insert({
      user_id: user.id,
      topic: parsed.data.topic,
      tone: parsed.data.tone,
      length: parsed.data.length,
      result: JSON.stringify(result),
    });

    if (dbError) {
      console.error("[/api/generate] DB insert:", dbError.message);
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/generate]", err);
    return NextResponse.json(
      { message: normalizeError(err) },
      { status: 500 }
    );
  }
}
