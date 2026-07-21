const { askAI } = require("../services/aiService");

const chatWithAI = async (req, res) => {

  try {

    const { prompt, code } = req.body;

    if (!prompt) {

      return res.status(400).json({

        success: false,

        message: "Prompt is required.",

      });

    }

    const reply = await askAI(prompt, code);

    return res.status(200).json({

      success: true,

      reply,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "AI Server Error",

    });

  }

};

module.exports = {

  chatWithAI,

};