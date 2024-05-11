import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MiniCart from '../miniCart/miniCart'
import { useProductContext } from '../../context/dataContext'
import DrawerMenu from '../drawerMenu/drawerMenu'
import classes from './header.module.css'

const Header = (props) => {

    const { dataCart, showMiniCart, setShowMiniCart } = useProductContext()
    const [cantidad, setCantidad] = useState()
    const [showModal, setShowModal] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {

        setCantidad(dataCart.length)
        const currentPath = window.location.pathname;
        const pathWithoutSlash = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
        const lastPart = pathWithoutSlash.split('/').pop();
        setCurrentUrl(lastPart)

    }, [dataCart, cantidad]);

    return (
        <>

            {currentUrl !== 'OrdenarPizza' && currentUrl !== 'DinosPizza'  && currentUrl !== 'thepizzaspot'  &&(
                <nav className="  text-black ">
                    <div className={classes.vistaDesk}>
                        <Link className="text-3xl font-bold font-heading min-w-max" to="/" >
                            <img className="h-9" src="/menus192.png" alt="logo" />
                        </Link>
                        <ul className={classes.listaDesk}>
                            <Link className="hover:text-gray-200" to="/">Inicio</Link>
                            <Link className="hover:text-gray-200" to="/order">Ordenar</Link>
                            {/*  <Link className="hover:text-gray-200" to="/category/1">Categorias</Link>
                             <Link className="hover:text-gray-200" to="/details/1">Detalles</Link> */}
                            <Link className="hover:text-gray-200" to="/nosotros">Nosotros</Link>
                            <Link className="hover:text-gray-200" to="/sucursales">Sucursales</Link>
                            <Link className="hover:text-gray-200" to="/contactanos">Contactanos</Link>
                        </ul>

                        <div className=" flex">
                            <Link className="flex items-center hover:text-gray-200" onClick={() => setShowMiniCart(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {dataCart.length > 0 && (
                                    <span className="flex absolute -mt-5 ml-4">
                                        <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
                                        {/* aparece el numero de articulos en el carrito */}
                                        {/*  <span className='text-white relative right-[15px] bottom-[2px]'>{dataCart.length}</span> */}
                                    </span>
                                )}

                            </Link>
                            <DrawerMenu />
                        </div>
                    </div>

                </nav>
            )}

            <MiniCart showModal={showMiniCart} setShowModal={setShowMiniCart} />
        </>

    )
}
export default Header