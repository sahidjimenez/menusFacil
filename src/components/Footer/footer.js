import React, { useEffect, useState } from 'react'
import classes from './footer.module.css'
const Footer = () => {

    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {

        const currentPath = window.location.pathname;
        const pathWithoutSlash = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
        const lastPart = pathWithoutSlash.split('/').pop();
        setCurrentUrl(lastPart)
    }, [currentUrl]);
    return (
        <>
            {currentUrl !== 'OrdenarPizza' && currentUrl !== 'DinosPizza' && currentUrl !== 'thepizzaspot' && (
                <div className={classes.root}>

                   {/*  <div className={classes.footerTop}>
                        <p>
                            Calle 59 5, Zona Centro, 24000 Campeche, Camp.
                        </p>
                        <p>
                            Tel. 981-127-1513
                        </p>
                        <p>
                            Lun-Sab 8:00 - 21:00
                        </p>
                        <p>
                            Dom 8:00 - 16:00
                        </p>
                    </div> */}

                    <div className={classes.footerBottom}>
                       {/*  <p>
                            San Francisco de Campeche, México. Fresh and Green®
                        </p> */}
                        <p>
                            Todos los Derechos Reservados. México 2023
                        </p>
                       {/*  <p>
                            Desarrollado por Sahid Abraham Jiménez Cazán
                        </p> */}
                    </div>

                </div>
            )}

        </>

    )
}

export default Footer