import React from 'react'
import Classes from './nosotros.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ReactDOM } from 'react';
import { Carousel } from 'react-responsive-carousel'
const Nosotros = () => {
    return (
        <div className={Classes.root}>

            <div className='max-w-[600px] m-auto p-[16px]'>
                <Carousel>
                    <div>
                        <img src="/L1.jpg" alt="Imagen 1" />
                        <p className="legend">Restaurante en el centro de campeche</p>
                    </div>
                    <div>
                        <img src="/L2.jpg" alt="Imagen 2" />
                    </div>
                    <div>
                        <img src="/L3.jpg" alt="Imagen 2" />
                    </div>
                    <div>
                        <img src="/L4.jpg" alt="Imagen 2" />
                    </div>
                    <div>
                        <img src="/L5.jpg" alt="Imagen 2" />
                    </div>
                    {/* Agrega más diapositivas aquí si lo deseas */}
                </Carousel>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <iframe
                        title='Mapa de fresh and green campeche'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7505.91975076336!2d-90.53549320072018!3d19.841650621478845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85f833f1071891f3%3A0x810711aa7b1ed720!2sFresh'n%20Green!5e0!3m2!1ses-419!2smx!4v1628714906005!5m2!1ses-419!2smx"
                        width="100%"
                        height="290"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default Nosotros


