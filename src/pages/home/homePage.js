import React from 'react'
import classes from './home.module.css'

import VistaDesk from './vistaDesk'

export default function HomePage() {


  const vistaDesk = (
    <div className={classes.containerDesk}>

      <VistaDesk />
    </div>
  )
  const vistaMobile = (
    <div className={classes.containerMobile}>
      <div>
        <img className="h-9" src="/imagen1.png" alt="imagen 1" />

      </div>
      <div>
        <img className="h-9" src="/imagen2.png" alt="imagen 1" />
        <a href='/order' className={classes.button}>Haz tu pedido</a>
      </div> <div>
        <img className="h-9" src="/imagen3.png" alt="imagen 1" />
        <a href='/menu' className={classes.button}>Menú</a>
      </div> <div>
        <img className="h-9" src="/imagen4.png" alt="imagen 1" />
        <a href='/nosotros' className={classes.button}>Nosotros</a>
      </div> <div>
        <img className="h-9" src="/imagen5.png" alt="imagen 1" />
        <a href='/contactanos' className={classes.button}>Contacto</a>
      </div>
    </div>
  )


  return (
    <>
      {vistaDesk}
      {vistaMobile}
    </>
  )
}
