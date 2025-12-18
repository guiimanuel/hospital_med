const express = require('express');
const exphbs = require('express-handlebars');

const agendamento = require('./models/agendamento.model');
const medico = require('./models/medico.model');
const paciente = require('./models/paciente.model');
const bancoSangue = require('./models/bancoSangue.model');
const internamento = require('./models/internamento.model');
const cirurgia = require('./models/cirurgia.model');
const prontuario = require('./models/prontuario.model');
const db = require('./config/database');
const { raw } = require('body-parser');

agendamento.belongsTo(paciente, { foreignKey: "id_paciente" });
agendamento.belongsTo(medico, { foreignKey: "id_medico" });
prontuario.belongsTo(paciente, { foreignKey: "id_paciente" });
prontuario.belongsTo(agendamento, { foreignKey: "id_agendamento" });
paciente.hasMany(prontuario, { foreignKey: "id_paciente" });
agendamento.hasOne(prontuario, { foreignKey: "id_agendamento" });

const app = express();
const port = 8200;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const hbs = exphbs.create({
    defaultLayout: false,
    helpers: {
        'format-date': function(date) {
            if (!date) return '';
            const d = new Date(date);
            const day = String(d.getDate() + 1).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//home
app.get('/', (req, res) => {
    res.render('home')
});

//-----------------------------------------listar------------------------------------------------------------//
// pacientes
app.get('/pacientes', async (req,res) => {
    try{
        let pacientes = await paciente.findAll({raw: true});
        res.render('listarPaciente', {pacientes});
    }catch(error){
        console.error('Erro ao buscar pacientes:', error);
        res.status(500).send('Erro ao buscar pacientes');
    }
});

//medicos
app.get('/medicos', async (req,res) => {
    try{
        let medicos = await medico.findAll({raw: true});
        res.render('listarMedico', {medicos});
    }catch(error){
        console.error('Erro ao buscar médicos:', error);
        res.status(500).send('Erro ao buscar médicos');
    }
});

//agendamentos
app.get('/agendamentos', async (req,res) => {
    try{
        let agendamentos = await agendamento.findAll({raw: true});
        res.render('listarAgendamento', {agendamentos});
    }catch(error){
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).send('Erro ao buscar agendamentos');
    }
});

//bancos de sangue
app.get('/bancosSangue', async (req,res) => {
    try{
        let bancosSangue = await bancoSangue.findAll({raw: true});
        res.render('listarBancoSangue', {bancosSangue});
    }catch(error){
        console.error('Erro ao buscar bancos de sangue:', error);
        res.status(500).send('Erro ao buscar bancos de sangue');
    }
});

//internamentos
app.get('/internamentos', async (req,res) => {
    try{
        let internamentos = await internamento.findAll({raw: true});
        res.render('listarInternamento', {internamentos});
    }catch(error){
        console.error('Erro ao buscar internamentos:', error);
        res.status(500).send('Erro ao buscar internamentos');
    }
});

//cirurgias
app.get('/cirurgias', async (req,res) => {
    try{
        let cirurgias = await cirurgia.findAll({raw: true});
        res.render('listarCirurgia', {cirurgias});
    }catch(error){
        console.error('Erro ao buscar cirurgias:', error);
        res.status(500).send('Erro ao buscar cirurgias');
    }
});

//prontuarios
app.get("/prontuarios", async (req, res) => {
    try {
        let prontuarios = await prontuario.findAll({raw:true});
        res.render("listarProntuario", {prontuarios});
    } catch (error) {
        console.error("Erro ao buscar prontuários:", error);
        res.status(500).send("Erro ao buscar prontuários");
    }
});

//-----------------------------------------cadastrar------------------------------------------------------------//
//pacientes
app.get('/pacientes/novo', (req,res) => {
    res.render('cadastrarPaciente');
});

app.post('/pacientes', async (req,res) => {
    try{
        await paciente.create({
            nome: req.body.nome,
            idade: req.body.idade,
            cpf: req.body.cpf
        });
        res.redirect('/pacientes');
    }catch(error){
        console.error('Erro ao cadastrar paciente:', error);
        res.status(500).send('Erro ao cadastrar paciente');
    }
});

//medicos
app.get('/medicos/novo', (req,res) => {
    res.render('cadastrarMedico')
});

app.post('/medicos', async (req,res) => {
    try{
        await medico.create({
            crm: req.body.crm,
            nome: req.body.nome,
            idade: req.body.idade,
            especializacao: req.body.especializacao
        });
        res.redirect('/medicos');
    }catch(error){
        console.error('Erro ao cadastrar médico:', error);  
        res.status(500).send('Erro ao cadastrar médico');
    }
});

//agendamentos
app.get('/agendamentos/novo', (req,res) => {
    res.render('cadastrarAgendamento')
});

app.post('/agendamentos', async (req,res) => {
    try{
        await agendamento.create({
            id_paciente: req.body.id_paciente,
            id_medico: req.body.id_medico,
            hora_inicio: req.body.hora_inicio,
        });
        res.redirect('/agendamentos');
    }catch(error){
        console.error('Erro ao cadastrar agendamento:', error);
        res.status(500).send('Erro ao cadastrar agendamento');
    }
});

//bancos de sangue
app.get('/bancosSangue/novo', (req,res) => {
    res.render('cadastrarBancoSangue')
});

app.post('/bancosSangue', async (req,res) => {
    try{
        await bancoSangue.create({
            tipo_sangue: req.body.tipo_sangue,
            quantidade: req.body.quantidade
        });
        res.redirect('/bancosSangue');
    }catch(error){
        console.error('Erro ao cadastrar banco de sangue:', error);
        res.status(500).send('Erro ao cadastrar banco de sangue');
    }
});

//internamentos
app.get('/internamentos/novo', (req,res) => {
    res.render('cadastrarInternamento')
});

app.post('/internamentos', async (req,res) => {
    try{
        await internamento.create({
            id_paciente: req.body.id_paciente,
            medico_resp: req.body.medico_resp,
            quarto: req.body.quarto,
            data_entrada: req.body.data_entrada
        });
        res.redirect('/internamentos');
    }catch(error){
        console.error('Erro ao cadastrar internamento:', error);
        res.status(500).send('Erro ao cadastrar internamento');
    }
});

//cirurgias
app.get('/cirurgias/novo', (req,res) => {
    res.render('cadastrarCirurgia')
});

app.post('/cirurgias', async (req,res) => {
    try{
        await cirurgia.create({
            id_paciente: req.body.id_paciente,
            medico_resp: req.body.medico_resp,
            tipo_cirurgia: req.body.tipo_cirurgia,
            data_cirurgia: req.body.data_cirurgia
        });
        res.redirect('/cirurgias');
    }catch(error){
        console.error('Erro ao cadastrar cirurgia:', error);
        res.status(500).send('Erro ao cadastrar cirurgia');
    }
});

//prontuarios
app.get("/prontuarios/novo", (req, res) => {
    res.render("cadastrarProntuario");
});

app.post("/prontuarios", async (req, res) => {
    try {
        await prontuario.create({
            id_paciente: req.body.id_paciente,
            id_agendamento: req.body.id_agendamento,
            diagnostico: req.body.diagnostico,
            observacoes: req.body.observacoes
        });

        res.redirect("/prontuarios");
    } catch (error) {
        console.error(error);
        res.send("Erro ao cadastrar prontuário: ", error);
        res.status(500).send("Erro ao cadastrar prontuário");
    }
});




//-----------------------------------------detalhar------------------------------------------------------------//
//pacientes
app.get('/pacientes/:id', async (req,res) => {
    try{
        const pacienteDetalhar = await paciente.findByPk(req.params.id, {raw: true});
        res.render('detalharPaciente', {paciente: pacienteDetalhar});
    }catch(error){
        console.error('Erro ao buscar paciente:', error);
        res.status(500).send('Erro ao buscar paciente');
    }
});

//medicos
app.get('/medicos/:id', async (req,res) => {
    try{
        const medicoDetalhar = await medico.findByPk(req.params.id, {raw: true});
        res.render('detalharMedico', {medico: medicoDetalhar});
    }catch(error){
        console.error('Erro ao buscar médico:', error);
        res.status(500).send('Erro ao buscar médico');
    }
});

//agendamentos
app.get('/agendamentos/:id', async (req,res) => {
    try{
        const agendamentoDetalhar = await agendamento.findByPk(req.params.id, {raw: true});
        res.render('detalharAgendamento', {agendamento: agendamentoDetalhar});
    }catch(error){
        console.error('Erro ao buscar agendamento:', error);
        res.status(500).send('Erro ao buscar agendamento');
    }
});

//bancos de sangue
app.get('/bancosSangue/:id', async (req,res) => {
    try{
        const bancoSangueDetalhar = await bancoSangue.findByPk(req.params.id, {raw: true});
        res.render('detalharBancoSangue', {bancoSangue: bancoSangueDetalhar});
    }catch(error){
        console.error('Erro ao buscar banco de sangue:', error);
        res.status(500).send('Erro ao buscar banco de sangue');
    }
});

//internamentos
app.get('/internamentos/:id', async (req,res) => {
    try{
        const internamentoDetalhar = await internamento.findByPk(req.params.id, {raw: true});
        res.render('detalharInternamento', {internamento: internamentoDetalhar});
    }catch(error){
        console.error('Erro ao buscar internamento:', error);
        res.status(500).send('Erro ao buscar internamento');
    }
});

//cirurgias
app.get('/cirurgias/:id', async (req,res) => {
    try{
        const cirurgiaDetalhar = await cirurgia.findByPk(req.params.id, {raw: true});
        res.render('detalharCirurgia', {cirurgia: cirurgiaDetalhar});
    }catch(error){
        console.error('Erro ao buscar cirurgia:', error);
        res.status(500).send('Erro ao buscar cirurgia');
    }
});

//prontuarios
app.get('/prontuarios/:id', async (req,res) => {
    try{
        const prontuarioDetalhar = await prontuario.findByPk(req.params.id, {raw:true});
        res.render('detalharProntuario', {prontuario: prontuarioDetalhar});
    }catch(error){
        console.error('Erro ao buscar prontuário:', error);
        res.status(500).send('Erro ao buscar prontuário');
    }
});

//-----------------------------------------editar//atualizar------------------------------------------------------------//
//pacientes
app.get('/pacientes/:id/editar', async (req,res) => {
    try{
        const pacienteEditar = await paciente.findByPk(req.params.id, {raw: true});
        res.render('editarPaciente', {paciente: pacienteEditar});
    }catch(error){
        console.error('Erro ao buscar paciente:', error);
        res.status(500).send('Erro ao buscar paciente');
    }
});

app.post('/pacientes/:id', async (req,res) => {
    try{
        let pacienteAtualizar = await paciente.findByPk(req.params.id);
        pacienteAtualizar.nome = req.body.nome;
        pacienteAtualizar.idade = req.body.idade;
        pacienteAtualizar.cpf = req.body.cpf;
        await pacienteAtualizar.save();
        res.redirect('/pacientes');
    }catch(error){
        console.error('Erro ao atualizar paciente:', error);
        res.status(500).send('Erro ao atualizar paciente'); 
    }
});

//medicos
app.get('/medicos/:id/editar', async (req,res) => {
    try{
        const medicoEditar = await medico.findByPk(req.params.id, {raw: true});
        res.render('editarMedico', {medico: medicoEditar});
    }catch(error){
        console.error('Erro ao buscar médico:', error);
        res.status(500).send('Erro ao buscar médico');
    }
});

app.post('/medicos/:id', async(req,res) => {
    try{
        let medicoAtualizar = await medico.findByPk(req.params.id);
        medicoAtualizar.nome = req.body.nome;
        medicoAtualizar.idade = req.body.idade;
        medicoAtualizar.especializacao = req.body.especializacao;
        await medicoAtualizar.save();
        res.redirect('/medicos');
    }catch(error){
        console.error('Erro ao atualizar médico:', error);
        res.status(500).send('Erro ao atualizar médico');
    }
});

//agendamentos
app.get('/agendamentos/:id/editar', async (req,res) => {
    try{
        const agendamentoEditar = await agendamento.findByPk(req.params.id, {raw: true});
        res.render('editarAgendamento', {agendamento: agendamentoEditar});
    }catch(error){
        console.error('Erro ao buscar agendamento:', error);
        res.status(500).send('Erro ao buscar agendamento');
    }
});

app.post('/agendamentos/:id', async (req,res) => {
    try{
        let agendamentoAtualizar = await agendamento.findByPk(req.params.id);
        agendamentoAtualizar.nome_paciente = req.body.nome_paciente;
        agendamentoAtualizar.hora_inicio = req.body.hora_inicio;
        agendamentoAtualizar.especializacao = req.body.especializacao;
        await agendamentoAtualizar.save();
        res.redirect('/agendamentos');
    }catch(error){
        console.error('Erro ao atualizar agendamento:', error);
        res.status(500).send('Erro ao atualizar agendamento');
    }
});

//bancos de sangue
app.get('/bancosSangue/:id/editar', async (req,res) => {
    try{
        const bancoSangueEditar = await bancoSangue.findByPk(req.params.id, {raw: true});
        res.render('editarBancoSangue', {bancoSangue: bancoSangueEditar});
    }catch(error){
        console.error('Erro ao buscar banco de sangue:', error);
        res.status(500).send('Erro ao buscar banco de sangue');
    }
});

app.post('/bancosSangue/:id', async (req,res) => {
    try{
        let bancoSangueAtualizar = await bancoSangue.findByPk(req.params.id);
        bancoSangueAtualizar.tipo_sangue = req.body.tipo_sangue;
        bancoSangueAtualizar.quantidade = req.body.quantidade;
        await bancoSangueAtualizar.save();
        res.redirect('/bancosSangue');
    }catch(error){
        console.error('Erro ao atualizar banco de sangue:', error);
        res.status(500).send('Erro ao atualizar banco de sangue');
    }
});

//internamentos
app.get('/internamentos/:id/editar', async (req,res) => {
    try{
        const internamentoEditar = await internamento.findByPk(req.params.id, {raw: true});
        res.render('editarInternamento', {internamento: internamentoEditar});
    }catch(error){
        console.error('Erro ao buscar internamento:', error);
        res.status(500).send('Erro ao buscar internamento');
    }
});

app.post('/internamentos/:id', async (req,res) => {
    try{
        let internamentoAtualizar = await internamento.findByPk(req.params.id);
        internamentoAtualizar.nome_paciente = req.body.nome_paciente;
        internamentoAtualizar.quarto = req.body.quarto;
        internamentoAtualizar.data_entrada = req.body.data_entrada;
        await internamentoAtualizar.save();
        res.redirect('/internamentos');
    }catch(error){
        console.error('Erro ao atualizar internamento:', error);
        res.status(500).send('Erro ao atualizar internamento');
    }
});

//cirurgias
app.get('/cirurgias/:id/editar', async (req,res) => {
    try{
        const cirurgiaEditar = await cirurgia.findByPk(req.params.id, {raw: true});
        res.render('editarCirurgia', {cirurgia: cirurgiaEditar});
    }catch(error){
        console.error('Erro ao buscar cirurgia:', error);
        res.status(500).send('Erro ao buscar cirurgia');
    }
});

app.post('/cirurgias/:id', async (req,res) => {
    try{
        let cirurgiaAtualizar = await cirurgia.findByPk(req.params.id);
        cirurgiaAtualizar.nome_paciente = req.body.nome_paciente;
        cirurgiaAtualizar.tipo_cirurgia = req.body.tipo_cirurgia;
        cirurgiaAtualizar.data_cirurgia = req.body.data_cirurgia;
        await cirurgiaAtualizar.save();
        res.redirect('/cirurgias');
    }catch(error){
        console.error('Erro ao atualizar cirurgia:', error);
        res.status(500).send('Erro ao atualizar cirurgia');
    }
});

//prontuarios
app.get('/prontuarios/:id/editar', async (req,res) => {
    try{
        const prontuarioEditar = await prontuario.findByPk(req.params.id, {raw: true});
        res.render('editarProntuario', {prontuario: prontuarioEditar});
    }catch(error){
        console.error('Erro ao buscar prontuário:', error);
        res.status(500).send('Erro ao buscar prontuário');
    }
});

app.post('/prontuarios/:id', async (req,res) => {
    try{
        let prontuarioAtualizar = await prontuario.findByPk(req.params.id);
        prontuarioAtualizar.diagnostico = req.body.diagnostico;
        prontuarioAtualizar.observacoes = req.body.observacoes;
        await prontuarioAtualizar.save();
        res.redirect('/prontuarios');
    }catch(error){
        console.error('Erro ao atualizar prontuário:', error);
        res.status(500).send('Erro ao atualizar prontuário');
    }
});

//-----------------------------------------excluir------------------------------------------------------------//
//pacientes
app.post('/pacientes/:id/excluir', async(req,res) => {
    try{
        let pacienteExcluir = await paciente.findByPk(req.params.id);
        await pacienteExcluir.destroy();
        res.redirect('/pacientes');
    }catch(error){
        console.error('Erro ao excluir paciente:', error);
        res.status(500).send('Erro ao excluir paciente');
    }
});

//medicos
app.post('/medicos/:id/excluir', async(req,res) => {
    try{
        let medicoExcluir = await medico.findByPk(req.params.id);
        await medicoExcluir.destroy();
        res.redirect('/medicos');
    }catch(error){
        console.error('Erro ao excluir médico:', error);
        res.status(500).send('Erro ao excluir médico');
    }
});

//agendamentos
app.post('/agendamentos/:id/excluir', async (req,res) => {
    try{
        let agendamentoExcluir = await agendamento.findByPk(req.params.id);
        await agendamentoExcluir.destroy();
        res.redirect('/agendamentos');
    }catch(error){
        console.error('Erro ao excluir agendamento:', error);
        res.status(500).send('Erro ao excluir agendamento');
    }
});

//bancos de sangue
app.post('/bancosSangue/:id/excluir', async (req,res) => {
    try{
        let bancoSangueExcluir = await bancoSangue.findByPk(req.params.id);
        await bancoSangueExcluir.destroy();
        res.redirect('/bancosSangue');
    }catch(error){
        console.error('Erro ao excluir banco de sangue:', error);
        res.status(500).send('Erro ao excluir banco de sangue');
    }
});

//internamentos
app.post('/internamentos/:id/excluir', async (req,res) => {
    try{
        let internamentoExcluir = await internamento.findByPk(req.params.id);
        await internamentoExcluir.destroy();
        res.redirect('/internamentos');
    }catch(error){
        console.error('Erro ao excluir internamento:', error);
        res.status(500).send('Erro ao excluir internamento');
    }
});

//cirurgias
app.post('/cirurgias/:id/excluir', async (req,res) => {
    try{
        let cirurgiaExcluir = await cirurgia.findByPk(req.params.id);
        await cirurgiaExcluir.destroy();
        res.redirect('/cirurgias');
    }catch(error){
        console.error('Erro ao excluir cirurgia:', error);
        res.status(500).send('Erro ao excluir cirurgia');
    }
});

//prontuarios
app.post('/prontuarios/:id/excluir', async (req,res) => {
    try{
        let prontuarioExcluir = await prontuario.findByPk(req.params.id);
        await prontuarioExcluir.destroy();
        res.redirect('/prontuarios');
    }catch(error){
        console.error('Erro ao excluir prontuário:', error);
        res.status(500).send('Erro ao excluir prontuário');
    }
});

db.sync()
    .then(() => {
        console.log('Banco de dados sincronizado.');
    })
    .catch((e) => {
        console.error('Erro ao sincronizar o banco de dados:', e);
    });

app.listen(port,() => {
    console.log(`Servidor em execução: http://localhost:${port}`)
})