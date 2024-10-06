const express = require("express");
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const cors = require('cors')

const app = express();
app.use(cors());

const port = process.env.SERVER_PORT;

const { ChatGPT } = require("chatgpt-wrapper");
const chat = new ChatGPT({
  API_KEY: process.env.OPENAI_API_KEY,
});

// Function to fetch exoplanet data
async function fetchExoplanetData() {
  try {
    const response = await axios.get(
      "https://exoplanetarchive.ipac.caltech.edu/TAP/sync",
      {
        params: {
          query: "select pl_name from ps",
          format: "json",
        },
      }
    );

    const exoplanets = response.data
      .map((planet) => planet.pl_name)
      .filter((name) => (name.match(/ /g) || []).length <= 1) // Filter names with at most one space
      .map((name) => name.split(" ")[0]); // Remove everything after the first space, including the space

    // Save to a JSON file
    fs.writeFileSync("exoplanets.json", JSON.stringify(exoplanets, null, 2));
    console.log("Exoplanet data fetched and saved.");
  } catch (error) {
    console.error("Error fetching exoplanet data:", error);
  }
}

// Fetch data if exoplanets.json does not exist
if (!fs.existsSync("exoplanets.json")) {
  fetchExoplanetData();
}

app.get("/choose20", (req, res) => {
  const data = fs.readFileSync("exoplanets.json");
  const exoplanets = JSON.parse(data);

  // Shuffle and pick 20
  const shuffled = exoplanets.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 40);

  res.json(selected);
});

app.get("/exoplanet-info/:name", async (req, res) => {
  const exoplanetName = req.params.name;

  try {
    const prompt =
      `Tell me some fun and easy-to-understand facts about the exoplanet ${exoplanetName} that kids would love!. Use NASA's website to get information.`;
    const answer = await chat.send(prompt);
    res.json(answer.choices[0].message.content);
  } catch (error) {
    console.error("Error fetching exoplanet information:", error);
    res.status(500).send("Error fetching exoplanet information.");
  }
});

app.get("/exoplanet-story/:name", async (req, res) => {
  const exoplanetName = req.params.name;

  try {
    const prompt =
      `Create a short, exciting story for kids about the exoplanet ${exoplanetName}, with cool facts that make learning about space fun!.`;

    const answer = await chat.send(prompt);

    res.json(answer.choices[0].message.content);
  } catch (error) {
    console.error("Error creating exoplanet story:", error);
    res.status(500).send("Error creating exoplanet story.");
  }
});

app.get("/space-questions", async (req, res) => {
  const userQuestion = req.query.question;

  try {
    const prompt = `
      You are a space expert, and you can only answer questions related to space, astronomy, or exoplanets.
      If the question is not about these topics, respond strictly with:
      "Sorry, I only answer questions about space, astronomy, or exoplanets!"
      The question is: "${userQuestion}". Please respond appropriately, as if you're answering a school kid. Use NASA's website to get information.
    `;
    const answer = await chat.send(prompt);
    res.json(answer.choices[0].message.content);
  } catch (error) {
    console.error("Error processing the space-related question:", error);
    res.status(500).send("Error processing the space-related question.");
  }
});


// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Gracefully shutdown the server on SIGINT or SIGTERM
function handleShutdown(signal) {
  console.log(`Received ${signal}. Closing server gracefully...`);
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
}

// Listen for SIGINT and SIGTERM
process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
