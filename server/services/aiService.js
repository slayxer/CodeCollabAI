const model = require("../config/gemini");

const askAI = async (prompt, code = "") => {
  const finalPrompt = `
You are an expert software engineer.

User Request:
${prompt}

Code:
${code}

Provide a detailed and helpful response.
`;

  const result = await model.generateContent(finalPrompt);

  const response = await result.response;

  return response.text();
};

module.exports = {
  askAI,
};