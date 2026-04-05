// src/services/ai.service.js

// We added { removeBackground as imglyRemoveBackground } to fix the default export error
import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal';

export const removeBackground = async (file) => {
  try {
    const blob = await imglyRemoveBackground(file);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error('AI Processing Failed. Image might be too complex.');
  }
};