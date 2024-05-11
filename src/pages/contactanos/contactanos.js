import React, { useState } from 'react'
import Classes from './contactanos.module.css'

const Contactanos = () => {
    const [clienteCorreo, setClienteCorreo] = useState('');
    const [mensajeCorreo, setMensajeCorreo] = useState('');


    const construirMailto = () => {
        const emailDestinatario = 'freshngreencampeche@hotmail.com';
        const asunto = 'Correo desde la pagina de fresh';
        const cuerpoCorreo = `Cliente: ${clienteCorreo}\n\nMensaje: ${mensajeCorreo}`;
        return `mailto:${emailDestinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoCorreo)}`;
    };

    const enviar = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para enviar el formulario
        console.log(clienteCorreo, mensajeCorreo);
    };


    return (
        <div>
            <form onSubmit={enviar}>
                <div className='grid justify-items-center gap-3 pt-[50px]' >
                    <input
                        className={Classes.cliente}
                        placeholder='Cliente'
                        minLength="5"
                        value={clienteCorreo}
                        onChange={(e) => setClienteCorreo(e.target.value)}
                    />
                    <textarea
                        className={Classes.mensaje}
                        placeholder='Escriba su mensaje'
                        rows="10"

                        minLength="10"
                        value={mensajeCorreo}
                        onChange={(e) => setMensajeCorreo(e.target.value)}
                    ></textarea>
                    <div className={Classes.contenedorBoton}>
                        <a
                            className={Classes.boton}
                            href={construirMailto()}

                            rel="noopener noreferrer"
                        >
                            Enviar correo
                        </a>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contactanos
