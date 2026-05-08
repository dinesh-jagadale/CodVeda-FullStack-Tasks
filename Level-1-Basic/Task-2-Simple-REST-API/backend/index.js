const express = require("express");

const app = express();
app.use(express.json());

// Temporary in-memory data
let users = [
  { id: 1, name: "John", email: "john@gmail.com" },
  { id: 2, name: "Alice", email: "alice@gmail.com" }
];

/* =====================
   READ (GET)
   ===================== */

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

/* =====================
   CREATE (POST)
   ===================== */

// Create new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

/* =====================
   UPDATE (PUT)
   ===================== */

// Update user
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
});

/* =====================
   DELETE (DELETE)
   ===================== */

// Delete user
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

/* =====================
   SERVER
   ===================== */

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


/*GET http://localhost:3000/users
GET http://localhost:3000/users/1

DELETE http://localhost:3000/users/1

PUT http://localhost:3000/users/1
Body:
{
  "name": "Rahul Updated"
}

DELETE http://localhost:3000/users/1

*/
