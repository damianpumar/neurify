import { UserMood } from "~/neurify/context/context";
import config from "../../../neurify.config";

interface NeurifyConfig {
  model: string;
  token: string;
  user: {
    mood: UserMood;
  }
  guidelines: string;
  cache: {
    ttl: number;
  }
}

export const useNeurifyConfig = () => config as NeurifyConfig
