const express = require('express');
const app = express();
const PORT = 3300;

let users = [];
let userId = 1;

app.use(express.json());

// Criação 
app.post('/users', (req, res) => {
    const newUser = { id: userId++, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Leitura 
app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Usuário não encontrado.');
    res.json(user);
});

// Atualização 
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return res.status(404).send('Usuário não encontrado.');
    users[index] = { ...users[index], ...req.body };
    res.status(200).json(users[index]);
});

// Exclusão 
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return res.status(404).send('Usuário não encontrado.');
    const deletedUser = users.splice(index, 1);
    res.status(200).send(`Usuário excluído com sucesso.`);
});

app.listen(PORT, () => console.log(`CRUD rodando em http://localhost:${PORT}`));
