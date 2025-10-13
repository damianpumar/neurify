export default {
  model: "meta-llama/Llama-3.3-70B-Instruct",
  token: process.env.TOKEN,
  user: {
    mood: "neutral",
  },
  ui: {
    theme: "tailwind",
  },
  cache: {
    ttl: 3600,
  },
};
