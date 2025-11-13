const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 8200;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');

var pacientes = [
    {id_p:1, nome: 'Guilherme Manuel', idade: 16, cpf: 12345678901},
    {id_p:2, nome: 'Arthur Gusmão', idade: 16, cpf: 23456789012},
    {id_p:3, nome: 'Jefferson Ricardo', idade: 17, cpf: 34567890123}
]

var medicos = [
    {id_med:1, nome: 'Stephan Lacerda', idade: 28, especializacao: 'Cardiologia'},
    {id_med:2, nome: 'Richard Guilherme', idade: 37, especializacao: 'Pediatria'},
    {id_med:3, nome: 'Kelven Sérgio', idade: 56, especializacao: 'Urologia'}
]

var agendamentos = [
    {id_ag:1, nome: 'Guilherme Manuel', hora_inicio: 16, especializacao: 'Cardiologia' }
]

//home
app.get('/', (req, res) => {
    res.render('home')
});

//listar
app.get('/pacientes', (req,res) => {
    res.render('listarP', {pacientes});
});

app.get('/medicos', (req,res) => {
    res.render('listarMed', {medicos});
});

app.get('/agendamentos', (req,res) => {
    res.render('listarAg', {agendamentos});
});

//cadastrar
app.get('/pacientes/novo', (req,res) => {
    res.render('cadastrarP');
});

app.post('/pacientes', (req,res) => {
    const {nome, idade, cpf} = req.body;
    const novoPaciente = {
        id_p: pacientes.length + 1,
        nome: nome,
        idade: idade,
        cpf: cpf
    };
    pacientes.push(novoPaciente);
    res.render('listarP', {pacientes});
});

app.get('/medicos/novo', (req,res) => {
    res.render('cadastrarMed')
});

app.post('/medicos', (req,res) => {
    const {nome, idade, especializacao} = req.body;
    const novoMedico = {
        id_med: medicos.length + 1,
        nome: nome,
        idade: idade,
        especializacao: especializacao
    };
    medicos.push(novoMedico);
    res.render('listarMed', {medicos});
});

app.get('/agendamentos/novo', (req,res) => {
    res.render('cadastrarAg')
});

app.post('/agendamentos', (req,res) => {
    const {nome, hora_inicio, especializacao} = req.body;
    const novoAgendamento = {
        id_ag: agendamentos.length + 1,
        nome: nome,
        hora_inicio: hora_inicio,
        especializacao: especializacao
    };
    agendamentos.push(novoAgendamento);
    res.render('listarAg', {agendamentos});
});

//detalhar
app.get('/pacientes/:id_p', (req,res) => {
    const id_p = parseInt(req.params.id_p);
    const paciente = pacientes.find(p => p.id_p === id_p);
    if(paciente){
        res.render('detalharP', {paciente});
    }else{
        res.status(404).send('Paciente não encontrado.');
    }
});

app.get('/medicos/:id_med', (req,res) => {
    const id_med = parseInt(req.params.id_med);
    const medico = medicos.find(m => m.id_med === id_med);
    if(medico){
        res.render('detalharMed', {medico});
    }else{
        res.status(404).send('Médico não encontrado.');
    }
});

app.get('/agendamentos/:id_ag', (req,res) => {
    const id_ag = parseInt(req.params.id_ag);
    const agendamento = agendamentos.find(a => a.id_ag === id_ag);
    if(agendamento){
        res.render('detalharAg', {agendamento});
    }else{
        res.status(404).send('Agendamento não encontrado.');
    }
});

//editar
app.get('/pacientes/:id_p/editar', (req,res) => {
    const id_p = parseInt(req.params.id_p);
    const paciente = pacientes.find(p => p.id_p === id_p);
    if(paciente){
        res.render('editarP', {paciente});
    }else{
        return res.status(404).send('Paciente não encontrado.');
    }
});

app.post('/pacientes/:id_p', (req,res) => {
    const id_p = parseInt(req.params.id_p);
    const paciente = pacientes.find(p => p.id_p === id_p);
    if(paciente){
        paciente.nome = req.body.nome;
        paciente.idade = req.body.idade;
        paciente.cpf = req.body.cpf;
        res.render('listarP', {pacientes});
    }else{
        return res.status(404).send('Paciente não encontrado.');
    }
});

app.get('/medicos/:id_med/editar', (req,res) => {
    const id_med = parseInt(req.params.id_med);
    const medico = medicos.find(m => m.id_med === id_med);
    if(medico){
        res.render('editarMed', {medico});
    }else{
        return res.status(404).send('Médico não encontrado.');
    }
});

app.post('/medicos/:id_med', (req,res) => {
    const id_med = parseInt(req.params.id_med);
    const medico = medicos.find(m => m.id_med === id_med);
    if(medico){
        medico.nome = req.body.nome;
        medico.idade = req.body.idade;
        medico.especializacao = req.body.especializacao;
        res.render('listarMed', {medicos});
    }else{
        return res.status(404).send('Médico não encontrado.');
    }
});

app.get('/agendamentos/:id_ag/editar', (req,res) => {
    const id_ag = parseInt(req.params.id_ag);
    const agendamento = agendamentos.find(a => a.id_ag === id_ag);
    if(agendamento){
        res.render('editarAg', {agendamento});
    }else{
        return res.status(404).send('Agendamento não encontrado.');
    }
});

app.post('/agendametnos/:id_ag', (req,res) => {
    const id_ag = parseInt(req.params.id_ag);
    const agendamento = agendamentos.find(a => a.id_ag === id_ag);
    if(agendamento){
        agendamento.nome = req.body.nome;
        agendamento.hora_inicio = req.body.hora_inicio;
        agendamento.especializacao = req.body.especializacao;
        res.render('listarAg', {agendamentos});
    }else{
        return res.status(404).send('Agendamento não encontrado.');
    }
});

//excluir
app.post('/pacientes/:id_p/excluir', (req,res) => {
    const id_p = parseInt(req.params.id_p);
    const index = pacientes.findIndex(p => p.id_p === id_p);
    if(index !== -1){
        pacientes.splice(index, 1);
        res.render('listarP', {pacientes});
    }else{
        return res.status(404).send('Paciente não encontrado.');
    }
});

app.post('/medicos/:id_med/excluir', (req,res) => {
    const id_med = parseInt(req.params.id_med);
    const index = medicos.findIndex(m => m.id_med === id_med);
    if(index !== -1){
        medicos.splice(index, 1);
        res.render('listarMed', {medicos});
    }else{
        return res.status(404).send('Médico não encontrado.');
    }
});

app.post('/agendamentos/:id_ag/excluir', (req,res) => {
    const id_ag = parseInt(req.params.id_ag);
    const index = agendamentos.findIndex(a => a.id_ag === id_ag);
    if(index !== -1){
        agendamentos.splice(index, 1);
        res.render('listarAg', {agendamentos});
    }else{
        return res.status(404).send('Agendamento não encontrado.');
    }
});

app.listen(port,() => {
    console.log(`Servidor em execução: http://localhost:${port}`)
})