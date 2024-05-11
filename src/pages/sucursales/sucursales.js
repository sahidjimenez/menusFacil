import React from 'react';
import Classes from './sucursales.module.css';



const Sucursales = () => {

    const IconoHoja = (
        <div className={Classes.IconoHoja}>
            <svg xmlns="http://www.w3.org/2000/svg" height="64" width="56" viewBox="0 0 448 512"><path d="M0 32c477.6 0 366.6 317.3 367.1 366.3L448 480h-26l-70.4-71.2c-39 4.2-124.4 34.5-214.4-37C47 300.3 52 214.7 0 32zm79.7 46c-49.7-23.5-5.2 9.2-5.2 9.2 45.2 31.2 66 73.7 90.2 119.9 31.5 60.2 79 139.7 144.2 167.7 65 28 34.2 12.5 6-8.5-28.2-21.2-68.2-87-91-130.2-31.7-60-61-118.6-144.2-158.1z" /></svg>
        </div>
    )
    const IconoPhone = (
        <div className={Classes.IconoPhone}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
        </div>
    )

    const datos = [
        { nombre: "Guadalajara", calle: "interior Mdo. Libertad Local 2018", telefono: "333-618-8112" },
        { nombre: "Campeche", calle: "Calle 59, #5 Col. Centro", telefono: "981-127-1513" },
        { nombre: "Chihuahua", calle: "Cd Judicial, Local 1 Cafeteria", telefono: "614-415-2673" },
        { nombre: "Monterrey", calle: "Centro Coahutemoc", telefono: "" },
        { nombre: "CDMX", calle: "Galeria de las Estrellas, Local j14", telefono: "" },
    ];

    return (
        <div className='grid  max-w-[600px] mx-auto p-[16px] gap-4'>
            {datos.map((item, index) => (
                <div className='grid justify-items-center items-center text-center gap-2' key={index}>
                    {IconoHoja}
                    <p className='text-[20px] font-bold'>{item.nombre}</p>
                    <p>{item.calle}</p>
                    <p>Teléfono: {item.telefono}</p>
                    <div>
                       
                        <a href={`tel:${item.telefono}`} className="flex gap-2 items-center h-[40px]  bg-[#89B74B] rounded-[4px] px-4 text-white" >
                        {IconoPhone}Contactar
                        </a>
                    </div>


                </div>
            ))}
        </div>
    )
}

export default Sucursales
