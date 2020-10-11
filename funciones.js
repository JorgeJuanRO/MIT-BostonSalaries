module.exports = {listajson,departamentos, saldepartamentos, funMaxSalary};

//FUNCION PARA GUARDAR EN UN ARRAY LA INFORMACIÓN MÁS RELEVANTE DE LA LISTA
function listajson(data){
    let array_datos_ejs = [];
    for (var i = 0; i < data.data.length; i++) {
        array_datos_ejs.push({
            array_key:i,
            array_id:(data.data[i][0]),
            array_nombre:(data.data[i][8]),
            array_puesto:(data.data[i][9]),
            array_departamento:(data.data[i][10]),
            array_salario_base:(data.data[i][11]),
            array_salario:(data.data[i][18])
        });
    }
    return array_datos_ejs;
}

//FUNCION PARA GUARDAR EN UN ARRAY LOS DEPARTAMENTOS QUE EXISTEN DE LA LISTA
function departamentos(data){
    let stringdepartamento = '';
    let array_departamentos = [];
    let iteracion = 0;

    for (var i = 0; i < data.data.length; i++) {
        if (String(data.data[i][10]) !=  stringdepartamento) {
            iteracion++;
            stringdepartamento = String(data.data[i][10]);
            array_departamentos.push({
                array_key:iteracion,
                array_departamento:(data.data[i][10])
            });
        }
    }
    return array_departamentos;
}

//FUNCION PARA GUARDAR EN UN ARRAY LAS PERSONAS QUE TRABAJAN EN UN DEPARTAMENTO CONCRETO QUE EXISTEN DE LA LISTA
function saldepartamentos(data,namdep){
    let stringdepartamento = String(namdep);
    let array_saldepartamentos = [];
    let iteracion = 0;

    for (var i = 0; i < data.data.length; i++) {
        if (String(data.data[i][10]) ==  stringdepartamento) {
            iteracion++;
            stringdepartamento = String(data.data[i][10]);
            array_saldepartamentos.push({
                array_key:iteracion,
                array_id:(data.data[i][0]),
                array_nombre:(data.data[i][8]),
                array_puesto:(data.data[i][9]),
                array_departamento:(data.data[i][10]),
                array_salario_base:(data.data[i][11]),
                array_salario:(data.data[i][18])
            });
        }
    }
    var array_departamentos_ordenado = (array_saldepartamentos.sort(function(prev, next){ return next.array_salario - prev.array_salario; }));
    //ORDENAR DE MAYOR A MENOR EL ARRAY
    for(i = 0; i < array_departamentos_ordenado.length; i++){
        array_departamentos_ordenado[i].array_key = i+1;
    }
    return array_departamentos_ordenado;
}


//funcion
function funMaxSalary(data){
    // CREAR VARIABLES PARA LA FUNCION ENCONTRAR SALARIO MÁXIMO
    // CREAR VARIABLES PARA LA FUNCION ENCONTRAR SALARIO MÁXIMO
    let maxSalary = 0;
    let indexOfMax = 0;
    let salary = 0;
    var objeto ={};
    var id=0;
    var muestra = 0;

    // BUCLE PARA BUSCAR Y GUARDAR LAS VARIABLES DEL ARRAY
    for (var i = 0; i < data.data.length; i++) {
        muestra++;
        salary = salary + Number(data.data[i][18]);
        if (Number(data.data[i][18]) > maxSalary) { 
            maxSalary = Number(data.data[i][18]);
            indexOfMax = i+1;
            id = i;
        }
    }
    //GUARDAR VALORES EN UN OBJETO PARA PODER MOSTRARLOS EN LA WEB
    objeto = {
        array_muestra:muestra, //conocer la cantidad de valores que hay en el archivo JSON
        array_key:1,
        array_id:(data.data[id][0]),
        array_nombre:(data.data[id][8]),
        array_puesto:(data.data[id][9]),
        array_departamento:(data.data[id][10]),
        array_salario_base:(data.data[id][11]),
        array_salario:(data.data[id][18])
        };
    //console.log(objeto);
return objeto;
}

