const runCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        message: "Language and code are required.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        output: `Language: ${language}

Received your code successfully.

${code}

✅ Backend communication is working.`,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { runCode };