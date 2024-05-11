import React, { useEffect, useMemo, useState } from 'react'
import { useProductContext } from '../../context/dataContext';
import { FormProvider, useForm } from "react-hook-form";
import Map from '../map/map';
import Second from './second';
import classes from './miniCart.module.css'

const MiniCart = (props) => {

    const { showModal, setShowModal } = props
    const { dataCart, removeFromCart, sendWhatsApp, setSelectedLocation, generarMensajeCarrito, setMensajeArray } = useProductContext();
    const [showSecond, setShowSecond] = useState(false)
    const [loading, setLoading] = useState(true);

    const [position, setPosition] = useState({ longitude: 0, latitude: 0 });
    const [userLocation, setUserLocation] = useState(null);
    const [latitudee, setLatitudd] = useState(0)
    const [longitudee, setLongitudd] = useState(0)
    const methods = useForm();

    const handleSelectLocation = (location) => {
        console.log('Ubicación seleccionada:', location);
    };

    const segundoPaso = (() => {
        setShowSecond(true)
        generarMensajeCarrito()
    })
    const cerrarYborrar = (() => {
        setShowModal(false)
        setShowSecond(false)
        setMensajeArray([])
        methods.reset()
    })
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

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitudd(latitude)
                    setLongitudd(longitude)
                    setUserLocation({ lat: latitude, lng: longitude });
                    setPosition({ lat: latitude, lng: longitude });
                    /*   onSelectLocation({ lat: latitude, lng: longitude }); */
                    setSelectedLocation({ lat: latitude, lng: longitude });
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting user's location:", error);
                    setLoading(false);
                },
                {
                    enableHighAccuracy: true
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };
    useEffect(() => {
        setTimeout(() => {
            getUserLocation();
        }, 5000);

    }, []);

    const mapa = (
        <Map
            latitudee={latitudee}
            longitudee={longitudee}
            loading={loading}
            setUserLocation={setUserLocation}
            userLocation={userLocation}
            setPosition={setPosition}
            position={position}
            showModal={showModal}
            onSelectLocation={handleSelectLocation}
            setSelectedLocation={setSelectedLocation}
        />
    )

    const modal = (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-2 top-2"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                        {/*header*/}
                        <div className="flex items-start justify-between py-2 px-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold capitalize">
                                Carrito
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => cerrarYborrar()}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <form onSubmit={methods.handleSubmit(sendWhatsApp)} >
                            <div className='max-h-[400px] overflow-auto'>
                                {!showSecond
                                    ? <div>
                                        {dataCart ? dataCart.map((element, key) => {
                                            return <div key={key}>
                                                <div className={classes.tabla}>
                                                    <div className='grid'>
                                                        <div className='text-left'>{element.food}</div>
                                                        {element.extraName && (<div className='text-left'>Extra :{element.extraName}</div>)}
                                                    </div>

                                                    {console.log('element', element)}
                                                    <div className='text-right'>{element.extraProteinaPrice ? parseInt(element.precio) + 20 : element.precio}</div>
                                                    <button
                                                        className='text-red-600 hover:bg-red-100 rounded px-2 py-1 transition duration-200'
                                                        type="button"
                                                        onClick={() => removeFromCart(key)}>
                                                        X
                                                    </button>
                                                </div>

                                            </div>
                                        }) : null}
                                    </div>
                                    : <Second map={mapa} />
                                }
                                {totalPrecio <= 0 &&
                                    (<div className="flex p-2 gap-1 ">
                                        <p>Carrito vacio</p>
                                    </div>)
                                }
                            </div>
                            <div className="flex p-2 px-6 gap-1 justify-end font-bold">
                                <p>Total:</p>
                                <p>${totalPrecio}</p>

                            </div>


                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => showSecond ? setShowSecond(false) : cerrarYborrar()}
                                >
                                    seguir comprando
                                </button>

                                {totalPrecio !== 0 && (
                                    showSecond
                                        ? <button
                                            /*  disabled={!methods.formState.isValid} */
                                            className="bg-emerald-500 text-white active:bg-emerald-600 disabled:bg-gray-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Finalizar pedido
                                        </button>
                                        : <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => showSecond ? sendWhatsApp() : segundoPaso()}
                                        >
                                            {!showSecond ? 'Continuar' : 'Finalizar pedido'}
                                        </button>
                                )}


                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {/* pantalla gris*/}
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )


    return (
        <FormProvider {...methods}>
            {showModal
                ? modal
                : null}
        </FormProvider>
    )
}

export default MiniCart
