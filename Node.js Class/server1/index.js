const express = require("express");

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" },
  { id: 3, name: "vishv", role: "student" },
  { id: 4, name: "rehan", role: "mentor" },
  { id: 5, name: "jonty", role: "student" },
  { id: 6, name: "jal", role: "mentor" },
];


console.log("test");
console.log("test 2");

app.get("/", (req, res) => {
  res.status(200).send(users);
});

app.get("/data", (req, res) => {
  res.status(200).send({ name: "vishv" });
});

app.get("/json", (req, res) => {
  res.status(200).send(users);
});


app.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).send({ message: "User not found" });
  }


  users[userIndex] = { id, ...updatedData };

  res.status(200).send({
    message: "User updated successfully",
    user: users[userIndex],
  });
});

app.patch("/data1/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.delete("/data/d/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
