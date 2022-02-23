const express = require("express");
const userServices = require("./user-services");
const app = express();
const port = 5000;
const cors = require("cors");

const chars = "abcdefghijklmnopqrstuvwxyz";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured in the server");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const result = userServices.findUserById(id);
  if (result === undefined || result.length === null)
    res.status(404).send("Resource not found.");
  else {
    result = { users_list: result };
    res.send(result);
  }
});

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const savedUser = await userServices.addUser(userToAdd);
  if (savedUser) res.status(201).send(savedUser).end();
  else res.status(500).end();
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = userServices.deleteUserById(id);
  if (result) {
    //users['users_list'] = users['users_list'].filter( (user) => user['id'] != id);
    res.status(204).send(result).end();
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});

function addUser(user) {
  users["users_list"].push(user);
}

function generateID() {
  out = "";
  for (i = 0; i < 6; i++) {
    if (i < 3) out += chars[Math.floor(Math.random() * 26)];
    else out += Math.floor(Math.random() * 9);
  }
  return out;
}

const findUserByName = (name, list) => {
  return list.filter((user) => user["name"] === name);
};

const findUserByJob = (job, list) => {
  return list.filter((user) => user["job"] === job);
};

function findUserById(id) {
  return users["users_list"].find((user) => user["id"] === id);
}
