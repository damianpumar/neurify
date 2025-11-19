import config from "./adaptive"

interface Adaptive {
  model: string;
  token: string;
  guidelines: string;
  cache: {
    ttl: number;
  }
}

export const useAdaptiveConfig = () => config as Adaptive
