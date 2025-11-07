import config from "../../../neurify.config";

interface NeurifyConfig {
  model: string;
  token: string;
  guidelines: string;
  cache: {
    ttl: number;
  }
}

export const useNeurifyConfig = () => config as NeurifyConfig
