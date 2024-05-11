import React from 'react'
import { useForm } from "react-hook-form"
import { useProductContext } from '../../context/dataContext'
const Inputs = (props) => {

    const { attributes } = props
    const { name, image, description, priceNew } = attributes;
    const complementos = true;
    const ingrediente = true;
    const opciones = true;


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const complementosInputs = (
        <div className='grid p-2'>
            <input {...register("complemento")} type="radio" value="A" />
            <input {...register("complemento")} type="radio" value="B" />
            <input {...register("complemento")} type="radio" value="C" />
        </div>
    )
    const ingredienteInputs = (
        <div className='grid p-2'>
            <input {...register("checkbox")} type="checkbox" value="A" />
            <input {...register("checkbox")} type="checkbox" value="B" />
            <input {...register("checkbox")} type="checkbox" value="C" />
        </div>
    )
    const opcionesInputs = (
        <div className='grid p-2'>
            <input {...register("opcion")} type="radio" value="A" />
            <input {...register("opcion")} type="radio" value="B" />
            <input {...register("opcion")} type="radio" value="C" />
        </div>
    )




    return (


        <div>
            <input type='hidden' {...register("food")} value={name} />
            <input type='hidden' {...register("precio")} value={priceNew} />

            {complementos ? complementosInputs : null}
            {ingrediente ? ingredienteInputs : null}
            {opciones ? opcionesInputs : null}

        </div>


    )
}

export default Inputs
