import React from 'react'

function Checkbox(props) {
    const { register, value, tipo } = props

    return (
        <div className='flex items-center gap-2'>

            <input
                type='checkbox'
                className='w-4 h-4 capitalize'
                value={value}
                {...register("opcion", {
                    required: {
                        value: true,
                        message: `${tipo} es requerido`

                    }
                })}
            />
            <p>{value}</p>
        </div>
    )
}

export default Checkbox