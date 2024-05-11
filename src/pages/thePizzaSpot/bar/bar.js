import React from 'react'
import classes from './bar.module.css'
import { useProductContext } from '../../../context/dataContext';

const Bar = (prop) => {

    const { totalPrecio, setShowMiniCart } = useProductContext();

    return (
        <div className={classes.root}>

            <button className='text-[3rem] pr-3' onClick={() => setShowMiniCart(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </button>

            <span className='text-[1.8rem] font-mono align pr-1 h-10 '>$</span>
            <span className='text-[1.8rem]  align pr-1 h-10'>{totalPrecio>0 ?totalPrecio:''}</span>
        </div>
    )
}

export default Bar