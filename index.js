const { inquirerMenu, listarOpcionesCotizacion, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


let opcion;

main = async()=>{
    const busquedas = new Busquedas();
    do {
        
        opcion = await inquirerMenu()
        
        
            switch (opcion) {
                case 1:
                    const opcionMoneda= await listarOpcionesCotizacion()
                    
                    if (opcionMoneda ===0) continue; //sale si selecciona 0

                    const cotizacion = await busquedas.cotizacion(opcionMoneda)

            
                    console.log(`\n Cotizacion de 1 moneda a Peso Argentino(ARS) \n`.green);
                       
                    console.log('Compra:',cotizacion.compra.red);
                    console.log('Venta:',cotizacion.venta.magenta);
                    console.log('Fecha:',cotizacion.fecha.yellow);

                    let busquedaGuardar = { opcionMoneda, cotizacion}

                    //Guardar en base de datos
                    busquedas.agregarHistorial(busquedaGuardar);

                    await pausa();

                break;
            
                case 2:
                    // console.log(busquedas.historial[0].opcionMoneda);
                    // console.log(busquedas.historial[0].cotizacion);
                    
                    

                    busquedas.historial.map((historial, i) =>{
                        // const idx= `${ i + 1}.`.green;
                        let moneda;
                        console.log(`----------------------`)
                        if (historial.opcionMoneda === 1) moneda=  `Dolar oficial`;
                        if (historial.opcionMoneda === 2) moneda=  `Dolar Blue`;
                        if (historial.opcionMoneda === 3) moneda=  `Euro`;
                        if (historial.opcionMoneda === 4) moneda=  `Real`;

                        console.log(moneda+` -> `,historial.cotizacion)
                        


                    })

                    await pausa();
                break;

                
            }
        

    } while (opcion !== 0);
}


main()