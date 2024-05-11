import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Checkbox from '../checkbox/checkbox'
import RadioButton from '../radioButton/radioButton'

const Second = ({ map }) => {
    const { formState: { errors } } = useFormContext();

    const methods = useFormContext();

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = event => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            {/* <p className='flex justify-center p-3'>Datos del cliente</p> */}
            <div>
                <div className="w-full ">
                    <div className="bg-white rounded px-4">
                        <div className=" gap-2 grid">

                            <input
                                {...methods.register("nombreCliente", {
                                    required: true, pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/,
                                        message: "Solo se permiten letras y espacios"
                                    }
                                })}
                                className="shadow appearance-none border border-green-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                minLength={3}
                                maxLength={20}
                                type="text"
                                placeholder="Nombre" />

                            {errors.nombreCliente && <p className="text-red-500 text-xs">{errors.nombreCliente.message}</p>}
                            <input
                                {...methods.register("numeroCliente", { required: true, maxLength: 10, minLength: 10, pattern: { value: /^[0-9]*$/, message: "Ingresa bien el telefono" } })}
                                className="shadow appearance-none border border-green-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="tel"
                                pattern="[0-9]*"
                                step={1}
                                minLength={10}
                                maxLength={10}
                                placeholder="Teléfono (10 digitos)" />
                            {errors.numeroCliente && <p className="text-red-500 text-xs">{errors.numeroCliente.message}</p>}


                            <Controller
                                name="referencia"
                                control={useFormContext.control}
                                rules={{
                                    maxLength: { value: 100, message: "El mensaje no debe tener más de 100 caracteres" },
                                    // Aquí puedes agregar más reglas según sea necesario
                                    pattern: {
                                        value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü.,\-/#\s]*$/,
                                        message: "Caracteres inválidos en la dirección"
                                    }
                                }}
                                render={({ field }) => (
                                    <textarea className='border-green-600 h-[75px] resize-none'
                                        id="referencia"
                                        {...field}
                                        placeholder='Referencias'
                                        maxLength={100} />

                                )}
                            />
                            {errors.referencia && <p className="text-red-500 text-xs">{errors.referencia.message}</p>}
                        </div>

                    </div>
                </div>
            </div>
            <div >
                {selectedOption === 'Llevar' ? map : null}
            </div>

            <div className='flex justify-center gap-4 p-3'>
                <label className='flex gap-1 items-center'>
                    <input
                        {...methods.register("opcionEnvio", { required: true })}
                        type="radio"
                        value="Llevar"
                        checked={selectedOption === 'Llevar'}
                        onChange={handleOptionChange}
                    />
                    Llevar
                </label>
                {/* <label className='flex gap-1 items-center'>
                    <input
                        {...methods.register("opcionEnvio", { required: true })}
                        type="radio"
                        value="Aqui"
                        checked={selectedOption === 'Aqui'}
                        onChange={handleOptionChange}
                    />
                    Aquí
                </label> */}
                <label className='flex gap-1 items-center'>
                    <input
                        {...methods.register("opcionEnvio", { required: true })}
                        type="radio"
                        value="Pasar"
                        checked={selectedOption === 'Pasar'}
                        onChange={handleOptionChange}
                    />
                    Pasar
                </label>
            </div>
            <div className="w-full ">
                <div className="bg-white rounded px-4">
                    <div className="relative gap-2 grid">
                        <span className="absolute inset-y-0 left-0 pl-1 flex items-center">
                            $
                        </span>
                        <input
                            {...methods.register("cambio", { pattern: /^[0-9]*$/ })}
                            className="shadow appearance-none border border-green-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="cambio"
                            step={1}
                            min={0}
                            type="number"
                            placeholder=" Con cuanto pagará" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Second
