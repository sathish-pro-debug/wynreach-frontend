import { api } from "./api";

export const generateAITemplate = async (prompt) => {
  return await api.post("/ai/templates/generate", {
    prompt,
  });
};