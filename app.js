// IMPORTS
const express = require('express'); //MÓDULO EXPRESS
const fetch = require('node-fetch'); //MÓDULO NODE-FETCH
const mod = require('./funciones.js'); // MÓDULO FUNCIONES PROPIAS



const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ARCHIVOS ESTÁTICOS. PERMITE CARGAR IMAGENES Y ESTILOS CSS.
app.use(express.static('public'));
app.use('/css',express.static(__dirname+ 'public/css'));
app.use('/js',express.static(__dirname+ 'public/js'));
app.use('/img',express.static(__dirname+ 'public/img'));

// SET VIEWS
app.set('views', './views');
app.set('view engine', 'ejs');

// FUNCIÓN ASINCRONA PARA CAPTAR TODA LA INFORMACIÓN DEL FICHERO ONLINE JSON Y MOSTRAR LOS PLANETAS
async function fetchAsync(){
    let response=await fetch("https://pollysnips.s3.amazonaws.com/bostonEmployeeSalaries.json"); 
    let data=await response.json();
    return data;
}

// PÁGINA PRINCIPAL (INDEX)
app.get('', (req,res) => {
    fetchAsync()
    .then(data=> mod.funMaxSalary(data))
    .then(objeto=> res.render('index',{objeto:objeto}))
    .catch(reason=>console.log(reason.message));
});

app.get('/ficherojson', (req,res) => {
    fetchAsync()
    .then(data=> mod.listajson(data))
    .then(array_datos_ejs=> res.render('ficherojson',{array_datos_ejs:array_datos_ejs}))
    .catch(reason=>console.log(reason.message));
});

app.get('/departamentos', (req,res) => {
    fetchAsync()
    .then(data=> mod.departamentos(data))
    .then(array_departamentos=> res.render('departamentos',{array_departamentos:array_departamentos}))
    .catch(reason=>console.log(reason.message));
});

app.post('/salariodepartamento', (req,res) => {
    const {newItem} = req.body;
    console.log(newItem);
    fetchAsync()
    .then(data=> mod.saldepartamentos(data, String(newItem))) // .then(data=> mod.saldepartamentos(data,'Student Support Svc'))
    .then(array_saldepartamentos=> res.render('salariodepartamento',{array_saldepartamentos:array_saldepartamentos}))
    .catch(reason=>console.log(reason.message));
});

app.get('/salariomasalto', (req,res) => {
    fetchAsync()
    .then(data=> mod.funMaxSalary(data))
    .then(objeto=> res.render('salariomasalto',{objeto:objeto}))
    .catch(reason=>console.log(reason.message));
});

app.get('/about', (req,res) => {
res.render('about');
});


// LISTEN ON PORT 3000
app.listen(port, () => console.info(`Listening on port ${port}`));