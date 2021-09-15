const http = require ('http')
const express = require ('express')
const bodyParser = require ('body-parser')


let contador = 3
let clientes = [
    {
        id: 1,
        nome: 'Joao',
        email: 'joao@email.com'
    },
    
    {
        id: 2,
        nome: 'Cristina',
        email: 'cristina@email.com'
    }
]

const app = express()
app.use(bodyParser.json())
const porta = 3000
app.set('port', porta)

//PUT http://localhost:3000/clientes/3
app.put('/clientes/:id', (req, res) => {
    console.log(clientes)
    console.log(req.params.id)
    const id = +req.params.id
    const cliente = clientes.find(cli => cli.id === id)
    cliente.nome = req.body.nome
    cliente.email = req.body.email
    res.status(200).json(cliente)
})

//DELETE http://localhost:3000/clientes/3
app.delete ('/clientes/:id', (req, res) => {
    clientes = clientes.filter (cli => cli.id !== +req.params.id)
    res.status(200).json(clientes)
})


//localhost:3000/clientes (POST)
app.post('/clientes', (req, res) => {
    const cliente = {
        id: contador++,
        nome: req.body.nome,
        email: req.body.email
    }
    clientes.push(cliente)
    res.status(201).json(clientes)
})

//localhost:3000/clientes (GET)
app.get('/clientes', (req, res) => {
    res.json(clientes)
})


//localhost:3000/teste (GET)
app.get ('/teste', (req, res) => {
    console.log ("Passando por aqui...")
    res.send ('Olá!')
})




const server = http.createServer(app)
server.listen(porta)