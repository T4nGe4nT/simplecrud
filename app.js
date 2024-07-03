let express = require('express');


let app = express();
app.use(express.json());

let port = 3000;

let users = [
    {id: 1, name: "Slim"},
    {id: 2, name: "Jeeter"},
    {id: 3, name: "Rhonda"}
];
//Landing for default path
app.get('/', (req, res) => {
    res.send('Welcome to the User API thingy. Start by adding "users" to your path.');
});

// Create a new user
app.post('/users', (req, res) => {
    let newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).send(newUser);
});
// Get user by id
app.get('/users/:id', (req, res) => {
    let userId = parseInt(req.params.id);
    let user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.send(user);
});
// get all users
app.get('/users', (req, res) => {
    res.send(users);
});
// Update a user
app.put('/users/:id', (req, res) => {
    let userId = parseInt(req.params.id);
    let updatedUser = req.body.name;
    let userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }
    users[userIndex].name = updatedUser;
    res.send(updatedUser);
});
// Delete a user
app.delete('/users/:id', (req, res) => {
    let userId = parseInt(req.params.id);
    let userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});