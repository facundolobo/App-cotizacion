//importaciones propias de node
const fs = require('fs');

//importaciones de 3ros
const axios = require('axios').default;


class Busquedas{
    
    historial = [];

    dbPath = './db/database.json';
    
    constructor (){
        //TODO: leer DB si exisite
        this.leerBD();
       
    }

    async cotizacion(opcionMoneda = null){
        let baseURL;

        //pagina principal
        const pagina= `https://api-dolar-argentina.herokuapp.com/`

        //dependiendo de la opcion
        if (opcionMoneda === 1) baseURL=  pagina+`api/dolaroficial`;
        if (opcionMoneda === 2) baseURL=  pagina+`api/dolarblue`;
        if (opcionMoneda === 3) baseURL=  pagina+`api/euro/nacion`;
        if (opcionMoneda === 4) baseURL=  pagina+`api/real/nacion`;
        


        //peticion http
        const intance = axios.create({
            baseURL: baseURL
            //params: this.paramsMapbox
        });
        
        try {
        
            const resp = await intance.get(); //realizamos la peticion
            return resp.data;


        } catch (error) {
            console.log(error);
        }

        return null
        

    }


    agregarHistorial (cotizacion ){
        
       //this.historial = this.historial.splice(0,5);
        
        this.historial.unshift(cotizacion) //lo agrega al primer lugar
        
        this.historial = this.historial.splice(0,5);
        //grabar en DB 
        this.guardarBD();

    }

    guardarBD(){
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify( payload )); //lo convierte a json y lo guarda
    }


    leerBD(){
        //Debe de existir...
        if(!fs.existsSync(this.dbPath)){ //verificamos si el archivo existe
            return null
        }
       
        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'});

        const data = JSON.parse(info); //destranformar lo q tengo 

        this.historial = data.historial;
    }

}

module.exports= Busquedas;