const axios = require("axios");

const executeCode = async (language, code) => {
  try {
    console.log("Sending request to Piston...");

    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language,
        version: "*",
        files: [
          {
            content: code,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    console.log("Piston Response:");
    console.log(response.data);

    return response.data;

  } catch (err) {

    console.log("===== AXIOS ERROR =====");

    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

    console.log("=======================");

    throw err;
  }
};

module.exports = { executeCode };