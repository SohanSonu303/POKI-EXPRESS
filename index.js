const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

async function getPokiData(name) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
}

app.post("/addTodo", async (req, res) => {
  try {
    console.log("API called");
    const name = req.body.name;
    
    if (!name) {
      return res.status(400).send('Name is required');
    }

    const data = await getPokiData(name);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("from express server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
