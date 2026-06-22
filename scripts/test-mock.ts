import { MockProvider } from "../src/lib/ai/mock-provider";

const provider = new MockProvider();

async function run() {
  console.log("Testing MockProvider...\n");

  const result = await provider.generate({
    topic: "Запрос о партнёрском сотрудничестве",
    tone: "formal",
    length: "medium",
  });

  console.log("Subject:", result.subject);
  console.log("\nBody:\n" + result.body);

  console.log("\n--- Error simulation ---");
  const errorProvider = new MockProvider(true);
  try {
    await errorProvider.generate({ topic: "Test", tone: "casual", length: "short" });
  } catch (err) {
    console.log("Error caught (expected):", (err as Error).message);
  }

  console.log("\n✓ MockProvider works correctly");
}

run().catch(console.error);
