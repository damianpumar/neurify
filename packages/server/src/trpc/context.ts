export async function createContext() {
  return {
    apiKey: process.env.ANTHROPIC_API_KEY,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
