import React from 'react'
import classes from './noFound.module.css'
const NoFound = () => {
    return (
        <div className={classes.errorContainer}>

            <div className={classes.error404}> <span>404</span></div>
            <div className="flex items-center justify-center" >
                <img className='h-[225px] w-auto md:h-[250px] ' src="/sticker404.png" alt="imagen 404" />
            </div>


            <div className={classes.errorDescription}>La página que buscas ya no existe o está en desarrollo.</div>
            <a href="/" className={classes.errorButton}>
                <span className={classes.errorButtonText}>VOLVER AL INICIO</span>
            </a>
        </div>
    )
}

export default NoFound
