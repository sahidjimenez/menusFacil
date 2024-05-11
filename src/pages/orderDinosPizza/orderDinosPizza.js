import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../context/dataContext';
import Modal from '../../components/modal/modal';
import ModalPizza from '../../components/modalPizzas/modalPizzas';
import { Link } from 'react-scroll'
import Bar from './bar/bar';
import ButtonTopView from '../../components/buttonTopView/buttonTopView';
import ModalDinosPizza from '../../components/modalDinosPizza/modalDinosPizza';

const OrderDinosPizza = (props) => {
    const { dataDinosPizza } = useProductContext();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de carga de datos (puedes sustituirlo por tu lógica real)
        const fetchData = async () => {
            // Aquí realizarías la lógica para obtener los datos
            // Por ejemplo, podrías llamar a una API, etc.
            // En este caso, simulamos una espera de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
        };

        fetchData();
    }, []); // El segundo argumento del useEffect es un array de dependencias, en este caso, vacío para que se ejecute solo una vez al montar el componente

    if (loading) {
        return  <div className="flex justify-center items-center h-screen">
        <img src = "/LoaderCube.svg" alt="Mi SVG feliz"/>
      </div>;
    }

    if (!dataDinosPizza) {
        return <p>No hay datos</p>;
    }

    const categoriasMostradas = {};

    const categoriasUnicas = [...new Set(dataDinosPizza.map(item => item.attributes.categoria))];


    return (

        <div className=" container m-auto max-w-[1200px] " >
            <div>
                <img className="h-auto w-full" src="/dinospizza.png" alt="imagen 1" />
            </div>

            <div className='text-xl text-center p-5 pb-0'>Ordenar</div>
          {/*   <div className='text-xl text-center p-5 pt-0 pb-1 '>Dino's Pizza</div> */}
            <Bar data={dataDinosPizza} />
            <div className="flex gap-3 p-2 m-auto max-w-[400px] capitalize overflow-x-auto">
                {categoriasUnicas.map((categoria, index) => (
                    <Link key={index} to= {categoria} spy={true} smooth={true} duration={500}>
                        <span className=' block w-max '>
                            {categoria}
                        </span>
                    </Link>
                ))}
            </div>
            {dataDinosPizza.map((item, index) => {
                // Verificar si esta categoría ya ha sido mostrada
                const mostrarCategoria = !categoriasMostradas[item.attributes.categoria];
                // Si es la primera vez, marcar como mostrada
                if (mostrarCategoria) {
                    categoriasMostradas[item.attributes.categoria] = true;
                }
                return (
                    <div className='grid py-2 m-auto max-w-[600px]' key={index}>
                        {/* Pasamos mostrarCategoria a Modal para decidir si mostrar el título */}
                        <ModalDinosPizza data={item} indice={index} mostrarCategoria={mostrarCategoria} />
                    </div>
                )
            })}
            <ButtonTopView />
        </div>
    )
}

export default OrderDinosPizza