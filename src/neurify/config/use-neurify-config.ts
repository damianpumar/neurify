import { UserMood } from "~/neurify/context/context";
import config from "../../../neurify.config";

interface NeurifyConfig {
  model: string;
  token: string;
  user: {
    mood: UserMood;
  }
  ui: {
    theme: 'tailwind' | 'material' | 'bootstrap';
  },
  cache: {
    ttl: number;
  }
}

export const useNeurifyConfig = () => config as NeurifyConfig
