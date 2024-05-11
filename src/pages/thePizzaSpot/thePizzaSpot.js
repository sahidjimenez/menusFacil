import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../context/dataContext';
import Modal from '../../components/modal/modal';
import ModalPizza from '../../components/modalPizzas/modalPizzas';
import { Link } from 'react-scroll'
import Bar from './bar/bar';
import ButtonTopView from '../../components/buttonTopView/buttonTopView';
import ModalThePizzaSpot from '../../components/modalThePizzaSpot/modalThePizzaSpot';
import ReactGA from 'react-ga4';
const ThePizzaSpot = (props) => {
    const { dataDinosPizza, dataThePizzaSpot } = useProductContext();

    const [loading, setLoading] = useState(true);

    console.log('dataThePizzaSpot', dataThePizzaSpot)
    useEffect(() => {
        // Simulación de carga de datos (puedes sustituirlo por tu lógica real)
        const fetchData = async () => {
            // Aquí realizarías la lógica para obtener los datos
            // Por ejemplo, podrías llamar a una API, etc.
            // En este caso, simulamos una espera de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
        };


        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname
        })


        fetchData();
    }, [window.location.pathname]); // El segundo argumento del useEffect es un array de dependencias, en este caso, vacío para que se ejecute solo una vez al montar el componente

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <img src="/LoaderCube.svg" alt="Mi SVG feliz" />
        </div>;
    }

    if (!dataThePizzaSpot) {
        return <p>No hay datos</p>;
    }

    const categoriasMostradas = {};

    const categoriasUnicas = [...new Set(dataThePizzaSpot.map(item => item.attributes.categoria))];


    return (

        <div className=" container m-auto max-w-[1200px] " >

            <div className='flex justify-center p-4 rounded-md'>
                <div className='w-[200px] h-auto '>
                    <img src='/thepizzaspotLogo.jpeg' alt='The spot' />
                </div>

            </div>

            <div className='text-[70px] font-bold text-center p-5 pb-0'>Menú</div>
            {/*   <div className='text-xl text-center p-5 pt-0 pb-1 '>Dino's Pizza</div> */}
            <Bar data={dataThePizzaSpot} />
            <div className="flex gap-3 p-2 m-auto max-w-[400px] capitalize overflow-x-auto ">
                {categoriasUnicas.map((categoria, index) => (
                    <Link key={index} to={categoria} spy={true} smooth={true} duration={500}>
                        <span className=' block w-max text-[20px]'>
                            {categoria}
                        </span>
                    </Link>
                ))}
            </div>
            {dataThePizzaSpot.map((item, index) => {
                // Verificar si esta categoría ya ha sido mostrada
                const mostrarCategoria = !categoriasMostradas[item.attributes.categoria];
                // Si es la primera vez, marcar como mostrada
                if (mostrarCategoria) {
                    categoriasMostradas[item.attributes.categoria] = true;
                }
                return (
                    <div className='grid py-2 m-auto max-w-[600px]' key={index}>
                        {/* Pasamos mostrarCategoria a Modal para decidir si mostrar el título */}
                        <ModalThePizzaSpot data={item} indice={index} mostrarCategoria={mostrarCategoria} />
                    </div>
                )
            })}
            <ButtonTopView />
        </div>
    )
}

export default ThePizzaSpot