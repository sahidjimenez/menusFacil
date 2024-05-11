import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import http from "../http";
import axios from "axios";
import ReactGA from 'react-ga4'

const DataContext = createContext([]);

const fetchData = async () => {
    try {
        const response = await axios.get('https://fresh-strapi-73a7518a11c9.herokuapp.com/api/product-pizzas');
        /* console.log('sahid', response.data); */
    } catch (error) {
        console.error(error);
    }
};

export const useProductContext = () => {
    return useContext(DataContext)
}

export const ProductProvider = ({ children }) => {

    const [data, setData] = useState([]);
    const [dataPizza, setDataPizza] = useState([]);
    const [dataDinosPizza, setDataDinosPizza] = useState([]);
    const [dataThePizzaSpot, setThePizzaSpot] = useState([]);
    const [dataCart, setDataCart] = useState([])
    const [dataCartText, setDataCartText] = useState([])
    const [nav_value, set_nav_value] = useState("ProductList");
    const [productId, setproductId] = useState("");
    const [selectedlocation, setSelectedLocation] = useState(null)
    const [mensajeArray, setMensajeArray] = useState([])
    const telefono = 9811028203;
    const telefonoThePizzaSpot =9811596467;

    const [showMiniCart, setShowMiniCart] = useState(false);
    fetchData();
    const recuperarLocal = () => {
        var getLocal = JSON.parse(localStorage.getItem('comida')) || [];
        const tiempoActual = new Date().toISOString();
        localStorage.setItem('ultimoMovimiento', tiempoActual);
        setDataCart(getLocal);
    };
    const verificarYEliminar = () => {
        const tiempoGuardado = localStorage.getItem('ultimoMovimiento');

        if (tiempoGuardado) {
            const tiempoGuardadoDate = new Date(tiempoGuardado);
            const tiempoActual = new Date();

            // Calcular la diferencia en milisegundos
            const diferencia = tiempoActual - tiempoGuardadoDate;

            // Si han pasado 30 minutos o más (1800000 milisegundos = 30 minutos)
            if (diferencia >= 1800000) {
                localStorage.removeItem('comida');
                localStorage.removeItem('ultimoMovimiento');  // También puedes eliminar la clave 'ultimoMovimiento' si lo deseas
            } else {
                // Programar la eliminación para que ocurra en 30 minutos desde la última actualización
                const tiempoRestante = 1800000 - diferencia;
                setTimeout(() => {
                    localStorage.removeItem('comida');
                    localStorage.removeItem('ultimoMovimiento');  // También puedes eliminar la clave 'ultimoMovimiento' si lo deseas
                }, tiempoRestante);
            }
        }
    }


    useEffect(() => {
        const readAllProducts = async () => {
            const response = await http.get("/api/products?populate=*&sort=categoria&pagination[limit]=60");
            const responseArr = Object.values(response.data.data);

            /* console.log('responseArr:',responseArr) */
            setData(responseArr);
        };
        const readAllProductsPizza = async () => {
            const response = await http.get("/api/product-pizzas?populate=*&sort=categoria&pagination[limit]=60");
            const responseArr = Object.values(response.data.data);

            /* console.log('responseArr:',responseArr) */
            setDataPizza(responseArr);
        };
        const readAllProductsDinosPizza = async () => {
            const response = await http.get("/api/dinos-pizzas?populate=*&sort=categoria&pagination[limit]=60");
            const responseArr = Object.values(response.data.data);

            /* console.log('responseArr:',responseArr) */
            setDataDinosPizza(responseArr);
        };
        const readAllProductsThePizzaSpot = async () => {
            const response = await http.get("/api/the-pizza-spots?populate=*&sort=categoria:asc,name:asc&pagination[limit]=60");
            const responseArr = Object.values(response.data.data);

            /* console.log('responseArr:',responseArr) */
            setThePizzaSpot(responseArr);
        };
        


        readAllProducts();
        readAllProductsPizza();
        readAllProductsDinosPizza();
        readAllProductsThePizzaSpot();
        recuperarLocal();
        verificarYEliminar();
    }, []);



    // add new Product
    const createNewProduct = async (data) => {
        await http.post("/api/products", data);
    };
    // update a Product entry
    const updateProduct = async (productId, data) => {
        await http.put(`/api/products/${productId}`, data);
    };
    // delete a Product entry
    const deleteProduct = async (productId) => {
        await http.delete(`/api/products/${productId}`);
    };
    // change navigation value
    const changeNavValue = (value) => {
        set_nav_value(value);
    };
    // get Product id value
    const getproductId = (id) => {
        setproductId(id);
    };

    const addToCart = ((item) => {
        /* setDataCart(item) */
        dataCart.push(item)
        setDataCart([...dataCart]);
    })

    const limpiarArray = (array) => {
        return array.map(elemento => elemento.replace(/\s{2,}/g, ' ').trim());
    }
    const totalPrecio = useMemo(() => {

        const totalFood = dataCart.reduce((total, item) => total + parseInt(item.precio), 0);
        const totalExtra = dataCart.reduce((total, item) => total + (item.extraPrice), 0);
        const totalProteina = dataCart.reduce((total, item) => total + (item.extraProteinaPrice), 0);
        const totalFoodPrice = totalFood + totalProteina
        if (totalExtra) {
            return totalFoodPrice + totalExtra
        } else {
            return totalFoodPrice
        }
    }, [dataCart]);
    var regex = /paquete\s+([1-9]\d*)/i;


    const verificarPaquete = (str) => {
        return regex.test(str);
    }

    const generarMensajeCarrito = (() => {
        const opcionesString = dataCart.filter(item => typeof item.opcion === 'string');
        const opcionesArray = dataCart.filter(item => Array.isArray(item.ingrdientes));


        for (const comida of dataCart) {
            const nombre = comida.food.toLowerCase();
            const opciones = comida.opcion ?? '';
            const opcion2 = comida.opcion2 ?? '';
            const ingredientes = comida.ingredientes ? comida.ingredientes.join(', ') : '';
            const ingredientes2 = comida.ingredientes2 ? comida.ingredientes2.join(', ') : '';
            const tamaño = comida.tamaño ?? '';
            const proteina = comida.proteina ?? '';
            const complemento = comida.complemento ?? '';
            const aderezos = comida.aderezos ?? '';
            const opcionMitad = comida.opcionMitad ? 'mitad ' + comida.opcionMitad : '';
            const extraName = comida.extraName ?? '';

            if (nombre === 'ensalada') {

                mensajeArray.push(
                    nombre +
                    ' ' + tamaño +
                    ' ' + proteina +
                    ' ' + ingredientes +
                    ' ' + complemento +
                    ' ' + aderezos +
                    ' Extra: ' + extraName +
                    ' '
                )
            }
            if (nombre !== 'ensalada' && nombre !== 'baguette' !== verificarPaquete(nombre)) {
                mensajeArray.push(
                    nombre +
                    ' ' + tamaño +
                    ' ' + proteina +
                    ' ' + opciones +
                    ' ' + ingredientes +
                    ' ' + complemento +
                    ' ' + aderezos +
                    ' ' + opcionMitad +
                    ' '
                )

            }

            if (nombre === 'baguette') {

                let proteinaText = ''
                if (proteina) {

                    proteinaText = 'con ' + proteina
                }
                let ingredientesText = ''
                if (ingredientes) {

                    ingredientesText = 'con ' + ingredientes
                }

                mensajeArray.push(
                    nombre +
                    ' ' + opciones +
                    ' ' + proteinaText +
                    ' ' + ingredientesText +
                    ' y aderezo ' + aderezos +
                    ' '
                )
            }
            if (verificarPaquete(nombre)) {

                mensajeArray.push(
                    nombre +
                    ' ' + tamaño +
                    ' ' + proteina +
                    ' ' + (opciones ? ' pizza 1 ' + opciones : '') +
                    ' ' + (opcion2 ? ' pizza 2 ' + opcion2 : '') +
                    ' ' + (ingredientes ? ' ingredientes pizza 1 ' + ingredientes : '') +
                    ' ' + (ingredientes2 ? ' ingredientes pizza 2 ' + ingredientes2 : '') +
                    ' ' + complemento +
                    ' ' + aderezos +
                    ' ' + (extraName ? 'Extra: ' + extraName : ' ')
                )
            }
        }
    })
    const sendWhatsApp = ((data) => {

        const { nombreCliente, cambio, numeroCliente, opcionEnvio, referencia } = data;
        const coma = ',';
        const espacio = '%20';
        let locationLink = '';
        let mensajeopcionEnvio = ''
        let resta = 0;
        const total = totalPrecio;
        let mensajepagocliente = ''
        const mensajeCliente = "*" + nombreCliente + "*, " + numeroCliente + ",";
        const textoComidas = limpiarArray(mensajeArray);
        const textoFinal = textoComidas.join(', ');
        const mensajeEspecificaciones = (
            referencia
                ? ' *Referencias: ' + referencia.replace('#', 'No ')
                : ''
        )

        if (opcionEnvio === 'Aqui') {
            mensajeopcionEnvio = ' ' + '*' + 'Comer' + espacio + 'aquí' + '*' + espacio;
        }
        if (opcionEnvio === 'Pasar') {
            mensajeopcionEnvio = ' ' + '*' + 'Pasar' + espacio + 'a' + espacio + 'buscar' + '*' + espacio;
        }
        if (opcionEnvio === 'Llevar') {
            mensajeopcionEnvio = ' ' + '*' + 'Llevar' + '*' + espacio;
        }

        if (cambio > 0) {

            resta = (cambio - totalPrecio);

            mensajepagocliente = '*' + 'Pago' + '*' + ':' + espacio + '$' + cambio + espacio + 'el cambio es: $' + resta;
        } else {
            mensajepagocliente = '';
        }
        const mensajeTotal = "El total: $" + total;


        const mensajeFinal =
            mensajeCliente +
            textoFinal +
            mensajeEspecificaciones +
            mensajeopcionEnvio +
            mensajeTotal +
            mensajepagocliente;

        
        /* console.log('mensajeFinal', mensajeFinal) */

        console.log('mensajeTotal',total)
        ReactGA.event({
            category: "Pedido",
            action: "se hizo un pedido",
            label:  "Pedido",
            value:total
        })

        if (selectedlocation && opcionEnvio === 'Llevar') {
            const { lat, lng } = selectedlocation;
            locationLink = ` https://maps.google.com/?q=${lat},${lng}`;
        }

        console.log('mensajeFinal',)
          try {
              localStorage.removeItem('comida')
              const linkCompleto = `https://api.whatsapp.com/send?phone=+${telefonoThePizzaSpot}&text=${mensajeFinal}${locationLink}`;
              window.location.href = linkCompleto;
  
  
          } catch (error) {
              console.error(error);
          }

    })
    const eliminarDelLocal = (indice) => {
        // Recuperar el array actual de localStorage
        const datos = JSON.parse(localStorage.getItem('comida')) || [];

        // Eliminar el elemento en el índice especificado
        datos.splice(indice, 1);

        // Guardar el array actualizado de vuelta en localStorage
        localStorage.setItem('comida', JSON.stringify(datos));
    };
    const removeFromCart = (itemToRemove) => {
        dataCart.splice(itemToRemove, 1);
        setDataCart([...dataCart])
        eliminarDelLocal(itemToRemove)
    };

    const value = {
        createNewProduct,
        data,
        updateProduct,
        deleteProduct,
        changeNavValue,
        nav_value,
        getproductId,
        productId,
        addToCart,
        dataCart,
        removeFromCart,
        sendWhatsApp,
        setSelectedLocation,
        generarMensajeCarrito,
        setMensajeArray,
        totalPrecio,
        showMiniCart,
        setShowMiniCart,
        dataPizza,
        dataDinosPizza,
        dataThePizzaSpot
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
};