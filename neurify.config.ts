export default {
  model: "meta-llama/Llama-3.3-70B-Instruct",
  token: process.env.TOKEN,
  ui: {
    defaultLayout: "adaptive",
    emotionTracking: true,
  },
  cache: {
    ttl: 3600,
  },
};
