const inquirer = require ('inquirer');
require('colors');

const preguntas =[
    {
        type: 'list',
        name: 'opcion',
        message:'¿Que desea hacer',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Seleccionar una moneda`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial de busqueda`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }

        ]
    }
];

const opcionesCotizacion =[
    {
        type: 'list',
        name: 'opcion',
        message:'Selecciones una moneda',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Dolar oficial`
            },
            {
                value: 2,
                name: `${'2.'.green} Dolar Blue`
            },
            {
                value: 3,
                name: `${'3.'.green} Euro`
            },
            {
                value: 4,
                name: `${'4.'.green} Real`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }

        ]
    }
];



const inquirerMenu = async()=>{
    console.clear();

    console.log('==========================='.green);
    console.log('   Selecciones una opción'.white);
    console.log('===========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas)
    return opcion;
}



const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question)
    return desc;

}

const listarOpcionesCotizacion = async() =>{
    //console.log('==========================='.green);
    console.clear();
    console.log('   Seleccione una moneda'.white);
    console.log('===========================\n'.green);
    const {opcion} = await inquirer.prompt(opcionesCotizacion)
    return opcion;

}

const pausa = ()=>{
    return new Promise (resolve => {
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        readline.question(`\nPresione ${'Enter'.green} para continuar\n`,(opt)=>{
            
            readline.close();
            resolve();
        })
    });
}


module.exports = {
    inquirerMenu,
    listarOpcionesCotizacion,
    pausa
    
}