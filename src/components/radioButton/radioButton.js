import React from 'react'

const RadioButton = (props) => {
    const { register, value, tipo } = props

    return (
        <div>
            <div className='flex items-center gap-2'>

                <input
                    type='radio'
                    className='w-4 h-4 capitalize'
                    value={value}
                    {...register(tipo, {
                        required: {
                            value: true,
                            message: `${tipo} es requerido`

                        }
                    })}
                />
                <p>{value}</p>
            </div>
        </div>
    )
}

export default RadioButton
