import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useProductContext } from '../../context/dataContext'
import classes from './modal.module.css'
import Select from 'react-select';
import { alertaAceptado } from '../../context/alertas';
import { Element } from 'react-scroll';
const ModalDinosPizza = (props) => {
    const {
        addToCart,
    } = useProductContext();


    const { data, mostrarCategoria } = props ? props : 'null';

    const { attributes } = data ? data : 'null'
    const { name, image, description, priceNew, opciones, categoria, priceOld } = attributes;
    const [statePrice, setStateprice] = useState(priceNew)
    const [showModal, setShowModal] = useState(false);
    const [showMitad, setShowMitad] = useState(false);

    const [showExtraProteina, setShowExtraProteina] = useState(false);
    const [showExtraIngredientes, setShowExtraIngredientes] = useState(false);

    const [selectedOption, setSelectedOption] = useState([]);

    const [extraName, setExtraName] = useState('');
    const [extraPrice, setExtraPrice] = useState(0);

    const [selectedCount, setSelectedCount] = useState(0);

    const [selectedCount2, setSelectedCount2] = useState(0);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        resetField,
        watch,
        formState: { isValid },
    } = useForm({ mode: 'onChange' })


    const valorOpcion = watch('opcion');
    const valorIngredientes = watch('ingredientes');

    const checkboxes = watch("ingredientes");
    const checkboxes2 = watch("ingredientes2")
    const extraProteina = watch("extraProteina")
    useEffect(() => {

        if (name === 'baguette') {
            if (valorOpcion !== 'vegetariano') {
                resetField('ingredientes')
            }
        }

        const count = checkboxes ? checkboxes.filter(Boolean).length : 0;
        const count2 = checkboxes2 ? checkboxes2.filter(Boolean).length : 0;
        setSelectedCount(count);
        setSelectedCount2(count2)


    }, [valorOpcion, valorIngredientes, resetField, checkboxes, name, checkboxes2])

    /* Extras */
    var handleChange = (selectedOption) => {
        setSelectedOption(selectedOption.value);
        const sumarLabels = (selectedOption) => {
            const labels = selectedOption.map(item => item.label);
            const labelsString = labels.join(', ');
            setExtraName(labelsString);
        };

        // Función para sumar los precios
        const sumarPrecios = (selectedOption) => {
            const totalPrecio = selectedOption.reduce((total, item) => total + item.precio, 0);
            setExtraPrice(totalPrecio);
        };

        sumarLabels(selectedOption);

        sumarPrecios(selectedOption);
    };

    const handleCheckboxChange = () => {
        setShowMitad(!showMitad);
        resetField("opcionMitad")
    };
    const handleCheckboxChangeExtraProteina = () => {
        setShowExtraProteina(!showExtraProteina);
        resetField("opcionExtraProteina")
    };

    const guardarLocal = (objetoComida) => {

        var getLocal = JSON.parse(localStorage.getItem('comida')) || [];
        getLocal.push(objetoComida)
        localStorage.setItem('comida', JSON.stringify(getLocal))
    }

    const onSubmit = (data) => {
        if (data.tamano === "vaso") {
            const formBedida = {
                ...data,
                precio: priceNew,
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            }
            addToCart(formBedida);
            guardarLocal(formBedida)
            setShowModal(false)
            setShowExtraProteina(false)
            setShowMitad(false)
            alertaAceptado()
            reset()

        } else if (data.tamano === "copa") {
            const formBedida = {
                ...data,
                precio: priceNew,
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            }
            addToCart(formBedida);
            guardarLocal(formBedida)
            setShowModal(false)
            setShowExtraProteina(false)
            setShowMitad(false)
            alertaAceptado()
            reset()

        } else if (data.tamano === "jarra") {
            const formBedida = {
                ...data,
                precio: priceOld,
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            }
            addToCart(formBedida);
            guardarLocal(formBedida)
            setShowModal(false)
            setShowExtraProteina(false)
            setShowMitad(false)
            alertaAceptado()
            reset()

        } else if ((data.tamano === "Agua 1/2 L")) {
            const formBedida = {
                ...data,
                precio: priceNew,
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            }
            addToCart(formBedida);
            guardarLocal(formBedida)
            setShowModal(false)
            setShowExtraProteina(false)
            setShowMitad(false)
            alertaAceptado()
            reset()
        } else if ((data.tamano === "Agua 1 L")) {
            const formBedida = {
                ...data,
                precio: '25',
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            }
            addToCart(formBedida);
            guardarLocal(formBedida)
            setShowModal(false)
            setShowExtraProteina(false)
            setShowMitad(false)
            alertaAceptado()
            reset()
        }
        else if ((data.tamano === "Agua Mineral")) {
            const formBedida = {
                ...data,
                precio: '25',
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            }
            addToCart(formBedida);
            guardarLocal(formBedida)
            setShowModal(false)
            setShowExtraProteina(false)
            setShowMitad(false)
            alertaAceptado()
            reset()
        }
        else if ((data.tamano === "Coca Cola")) {
            const formBedida = {
                ...data,
                precio: priceOld,
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            }
            addToCart(formBedida);
            guardarLocal(formBedida)
            setShowModal(false)
            setShowExtraProteina(false)
            setShowMitad(false)
            alertaAceptado()
            reset()
        }


        else {
            const formDataWithExtras = {
                ...data,
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            };

            addToCart(formDataWithExtras);
            guardarLocal(formDataWithExtras)
            setShowModal(false)
            setShowExtraProteina(false)
            setShowMitad(false)
            alertaAceptado()
            reset()
        }
    }

    const abrirModal = () => {
        if (opciones) {
            setShowModal(true)
        } else {
            const formDataWithExtras = {
                food: name,
                precio: priceNew.toString(),
                ...data,
                extraName: extraName,
                extraPrice: extraPrice,
                extraProteinaPrice: extraProteina ? 20 : 0
            };
            addToCart(formDataWithExtras);
            guardarLocal(formDataWithExtras)
            alertaAceptado()
        }
    }

    const button = (
        <div>
            {mostrarCategoria && (
                <Element className='text-center' name={data.attributes.categoria}>
                    <span className='capitalize  text-center'  >{data.attributes.categoria}</span>

                    <hr className='w-[50%] h-[2px] mx-auto my-4 bg-yellow-500 border-0 rounded md:my-10'></hr>
                </Element>
            )}
            <button
                className="  active:bg-green-600 sm:m-2 m-1  px-3  rounded  hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => abrirModal()}
            >
                <div className='grid grid-cols-2 p-2 h-100 gap-2 m-auto '>
                    <div className='grid content-baseline gap'>
                        <p className='capitalize text-left font-bold '>
                            {name}
                        </p>
                        <div className='flex font-medium gap-2 text-xs font-bold'>
                            {opciones?.precioVariable.length > 1
                                ? opciones?.precioVariable.map((element, index) => {
                                    let textoAdicional;
                                    if (index === 0) {
                                        // Texto para la primera iteración
                                        textoAdicional = "C";
                                    } else if (index === 1) {
                                        // Texto para la segunda iteración
                                        textoAdicional = "M";
                                    } else {
                                        // Texto para la tercera o más iteraciones
                                        textoAdicional = "G";
                                    }
                                    return <p key={index}>{textoAdicional}${element}</p>
                                })
                                : priceOld ? '$' + priceNew + ' $' + priceOld : '$' + priceNew}
                        </div>
                        <p className={classes.description}>
                            {description}

                        </p>

                    </div>
                    <div>
                        <img src={image.data.attributes.url} alt={name} />
                    </div>
                </div>
            </button>
        </div>
    )

    const modal = (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-2  text-[10px] sm:text-sm capitalize"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold capitalize">
                                {name}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {opciones && opciones.opcionesMitad.length > 0
                                ? <div className='grid grid-cols-3 grid-rows-auto p-6 pb-0 gap-3 "'>
                                    <div className='flex items-center gap-2'>
                                        <input {...register("mitad")} type="checkbox" value={showMitad} onChange={handleCheckboxChange} />
                                        <p>Mitad y mitad</p>
                                    </div>

                                    {showMitad && (

                                        <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>Opciones</p>
                                            {opciones && opciones.opciones.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>

                                                    <input {...register("opcionMitad", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>

                                    )}
                                </div>
                                : null
                            }
                            {opciones && opciones.baguette
                                && <div className='grid grid-cols-3 grid-rows-auto p-6 pb-0 gap-3 "'>
                                    <div className='flex items-center gap-2'>
                                        <input {...register("extraProteina")} type="checkbox" value={showExtraProteina} onChange={handleCheckboxChangeExtraProteina} />
                                        <p>Agregar proteina</p>
                                    </div>

                                    {showExtraProteina === true || valorOpcion === "frances" ? (
                                        <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>Opciones</p>
                                            {opciones && opciones.proteinas.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>

                                                    <input {...register("proteina", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>

                                                </div>
                                            })}

                                        </div>
                                    ) : null}

                                    {showExtraProteina === true || valorOpcion === "vegetariano" ? (
                                        <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            {(opciones && opciones.ingredientes.length > 0 && !opciones.baguette) || valorOpcion === "vegetariano" ?
                                                <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                                    <p className='col-span-3'>Ingredientes extra</p>
                                                    {opciones && opciones.ingredientes.map((element, index) => {
                                                        return <div className='flex items-center gap-2' key={index}>
                                                            <input {...register("ingredientes", { required: true })} type="checkbox" value={element} disabled={selectedCount >= 4 && !checkboxes?.includes(element)} />
                                                            <p>{element}</p>
                                                        </div>
                                                    })}

                                                </div>
                                                : null}
                                            <p className='text-[10px] text-red-600 col-span-3'>Solo se permite 4 ingredientes</p>
                                        </div>
                                    ) : null}
                                </div>
                            }
                            {opciones && opciones.wraps
                                && <div className='grid grid-cols-3 grid-rows-auto p-6 pb-0 gap-3 "'>

                                    {showExtraProteina === true || valorOpcion === "vegetariano" ? (
                                        <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            {(opciones && opciones.ingredientes.length > 0 && !opciones.baguette) || valorOpcion === "vegetariano" ?
                                                <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                                    <p className='col-span-3'>Ingredientes extra</p>
                                                    {opciones && opciones.ingredientes.map((element, index) => {
                                                        return <div className='flex items-center gap-2' key={index}>
                                                            <input {...register("ingredientes", { required: true })} type="checkbox" value={element} disabled={selectedCount >= 4 && !checkboxes?.includes(element)} />
                                                            <p>{element}</p>
                                                        </div>
                                                    })}

                                                </div>
                                                : null}
                                            <p className='text-[10px] text-red-600 col-span-3'>Solo se permite 4 ingredientes</p>
                                        </div>
                                    ) : null}
                                </div>
                            }


                            {opciones === null
                                ? <div className="grid grid-cols-1 px-4">
                                    <input type='hidden' {...register("food", { required: true })} value={name} />
                                    <input type='hidden' {...register("precio", { required: true })} value={priceNew} />
                                    <p className='text-center  p-2'>
                                        {description}
                                    </p> <p className='col-span-3'>ingredientes extra</p>
                                    <p className=' text-center font-medium p-2'>
                                        ${priceNew}
                                    </p>
                                </div>
                                : <div className="grid grid-cols-3 grid-rows-auto p-6  gap-3 ">
                                    <input type='hidden' {...register("food")} value={name} />
                                    <input type='hidden'  {...register("precio")} value={priceNew} />
                                    {opciones && opciones.tamaño
                                        ? <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>Tamaños</p>
                                            {opciones && opciones.tamaño.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("tamaño", { required: true })} type="radio" value={element} onChange={(value) => {


                                                        if (value.target.value === "chico") {
                                                            setValue("precio", "120")
                                                        }
                                                        if (value.target.value === 'mediano') {
                                                            setValue("precio", "130")
                                                        }
                                                        if (value.target.value === 'grande') {
                                                            setValue("precio", "140")
                                                        }
                                                    }} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}

                                    {opciones && opciones.tamanos
                                        ? <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            {opciones.tamanos.length > 0 && <p className='col-span-3'>Tamaño</p>}
                                            {opciones && opciones.tamanos.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("tamano", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}


                                    {opciones && opciones.proteina
                                        ? <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>proteinas</p>
                                            {opciones && opciones.proteina.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("proteina", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}

                                    {opciones && opciones.opciones.length > 0
                                        ? <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>Pizza 1</p>
                                            {opciones && opciones.opciones.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("opcion", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}
                                    {opciones && opciones.opciones2.length > 0
                                        ? <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>Pizza 2</p>
                                            {opciones && opciones.opciones2.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("opcion2", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}

                                    {(opciones && opciones.ingredientes.length > 0 && !opciones.baguette && !opciones.wraps) ?
                                        <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>Pizza 1 Ingredientes</p>
                                            {opciones && opciones.ingredientes.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("ingredientes", { required: true })} type="checkbox" value={element} disabled={selectedCount >= opciones.cantidadIngredientes && !checkboxes?.includes(element)} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}
                                    
                                    {(opciones && opciones.ingredientes2.length > 0) ?
                                        <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>Pizza 2 Ingredientes</p>
                                            {opciones && opciones.ingredientes2.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("ingredientes2", { required: true })} type="checkbox" value={element} disabled={selectedCount2 >= opciones.cantidadIngredientes && !checkboxes2?.includes(element)} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}


                                    {opciones && opciones.complementos.length > 0 ?
                                        <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>Complementos</p>
                                            {opciones && opciones.complementos.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("complemento", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}

                                    {opciones && opciones.aderezos.length > 0 ?
                                        <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>aderezos</p>
                                            {opciones && opciones.aderezos.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("aderezos", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}

                                    {opciones && opciones.extrasGratis > 0
                                        ? <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>plato de fruta (incluido)</p>
                                            {opciones && opciones.extrasGratis.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input checked={true} className='focus:outline-none focus:ring focus:ring-white ' {...register("fruta", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}

                                    {opciones && opciones.bebidas > 0
                                        ? <div className='col-span-3 grid grid-cols-3 gap-3 row-span-1'>
                                            <p className='col-span-3'>bebidas</p>
                                            {opciones && opciones.bebidas.map((element, index) => {
                                                return <div className='flex items-center gap-2' key={index}>
                                                    <input {...register("bebidas", { required: true })} type="radio" value={element} />
                                                    <p>{element}</p>
                                                </div>
                                            })}
                                        </div>
                                        : null}

                                    {opciones && opciones.extras.length > 0

                                        ? <div className="container col-span-3">
                                            <div className="mt-5 m-auto w-100">
                                                <p className='col-span-3'>Agregar extra</p>
                                                <Select
                                                    isMulti
                                                    onChange={handleChange}
                                                    options={opciones.extras}
                                                    getOptionLabel={(option) => `${option.label} $${option.precio}`}
                                                    getOptionValue={(option) => option.value}
                                                />
                                            </div>
                                        </div>
                                        : null}

                                </div>
                            }

                            {/*footer*/}
                            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    disabled={!isValid}
                                    className="bg-emerald-500 text-white active:bg-emerald-600 disabled:bg-gray-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Agregar
                                </button>
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
        <>
            {button}
            {showModal
                ? modal
                : null}
        </>
    )
}

export default ModalDinosPizza