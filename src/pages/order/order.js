import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../context/dataContext';
import Modal from '../../components/modal/modal';
import { Link } from 'react-scroll'
import Bar from './bar/bar';
import ButtonTopView from '../../components/buttonTopView/buttonTopView';

const Order = (props) => {
    const { data } = useProductContext();

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
        return <p>Cargando...</p>;
    }

    if (!data) {
        return <p>No hay datos</p>;
    }

    const categoriasMostradas = {};

    const categoriasUnicas = [...new Set(data.map(item => item.attributes.categoria))];

    return (

        <div className=" container m-auto max-w-[1200px] " >
            {/* <div>
                <img className="h-auto w-full" src="/imagen1.png" alt="imagen 1" />

            </div> */}


            <div className='text-xl text-center p-5 pb-0'>Ordenar</div>
            <div className='text-xl text-center p-5 pt-0 pb-1 '>Fresh'n Green</div>
            <Bar data={data} />
            <div className="flex gap-3 p-2 m-auto max-w-[400px] capitalize overflow-x-auto">
                {categoriasUnicas.map((categoria, index) => (
                    <Link key={index} to={categoria} spy={true} smooth={true} duration={500}>
                        <span className='text-green-800'>
                            {categoria}
                        </span>
                    </Link>
                ))}
            </div>
            {data.map((item, index) => {
                // Verificar si esta categoría ya ha sido mostrada
                const mostrarCategoria = !categoriasMostradas[item.attributes.categoria];
                // Si es la primera vez, marcar como mostrada
                if (mostrarCategoria) {
                    categoriasMostradas[item.attributes.categoria] = true;
                }
                return (
                    <div className='grid py-2 m-auto max-w-[600px]' key={index}>
                        {/* Pasamos mostrarCategoria a Modal para decidir si mostrar el título */}
                        <Modal data={item} indice={index} mostrarCategoria={mostrarCategoria} />
                    </div>
                )
            })}
            <ButtonTopView />
        </div>
    )
}

export default Order