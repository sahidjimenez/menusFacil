import React from 'react'
import classes from './vistaDesk.module.css';
import { useProductContext } from '../../../context/dataContext';

const VistaDesk = () => {



    const maxItems = 3; // Máximo número de items a renderizar
    // Función para obtener elementos aleatorios

    const { data } = useProductContext()
    const getRandomElements = (arr, count) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const randomData = getRandomElements(data, maxItems);



    return (
        <div>
            <div className={classes.banner}>
                <div className={classes.leftSide}>
                    <div className={classes.textContent}>
                        <h1 className={classes.title}>Fresh´n Green</h1>
                        <p className={classes.description}>

                            Descubre Fresh'n Green, tu destino en Campeche para una comida saludable y deliciosa. Nos especializamos en Baguettes y ensaladas frescas, preparadas con ingredientes de la más alta calidad. Disfruta de sabores excepcionales que deleitarán tus sentidos en un ambiente acogedor.
                        </p>
                        <p className={classes.description}>
                            ¡Visítanos y vive la experiencia de frescura y calidad en cada bocado!
                        </p>
                        <div className={classes.buttonGroup}>
                            <a href="#" className={classes.button}>Saber más</a>
                            <a href="#" className={classes.button}>Ordenar</a>
                        </div>
                    </div>
                </div>
                <div className={classes.rightSide}>
                    <img src="/ensaladaG.png" alt="Cup of coffee" />
                    <div></div>
                </div>
            </div>


            <div className={classes.menu}>
                {randomData.map((item, index) => (
                    // Renderiza cada item como necesites
                    <div  className={classes.menuItem} key={index}>
                       
                        <img src={item.attributes.image.data.attributes.url} alt={item.attributes.name} />
                       
                        <p className='font-bold text-xl py-2 capitalize'> {item.attributes.name}</p>
                        <p> {item.attributes.description}</p>
                        <span className="price font-bold">$ {item.attributes.priceNew}</span>
                        <br></br> <br></br>
                      
                        <a href='/order' className={classes.button}>Añadir al carrito</a>
                    </div>
                ))}
            </div>
{/*             <div>
                <div className={classes.menu}>
                    <div className={classes.menuItem}>
                        <img src="https://freshngreencampeche.com/assets/omelet.jpg" alt="Nepalese MOMO" />
                        <h3>Nepalese MOMO</h3>
                        <p>Deliciosos dumplings al vapor con un relleno sabroso, servidos con una salsa especial.</p>
                        <span className="price">£22</span>
                        <button>Añadir al carrito</button>
                    </div>
                    <div className={classes.menuItem}>
                        <img src="https://freshngreencampeche.com/assets/molletes.jpg" alt="Burger" />
                        <h3>Burger</h3>
                        <p>Hamburguesa clásica con carne jugosa, queso derretido, lechuga fresca y tomate, en un pan suave y esponjoso.</p>
                        <span className="price">£5</span>
                        <button>Añadir al carrito</button>
                    </div>
                    <div className={classes.menuItem} >
                        <img src="	https://freshngreencampeche.com/assets/enchiladas.jpg" alt="Gurkha Chicken" />
                        <h3>Gurkha Chicken</h3>
                        <p>Pollo marinado en especias Gurkha, asado a la parrilla y servido con vegetales salteados.</p>
                        <span className="price">£4.50</span>
                        <button>Añadir al carrito</button>
                    </div>
                </div>
            </div> */}
        </div>



    )
}

export default VistaDesk
