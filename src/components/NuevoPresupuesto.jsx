import React, { useState } from 'react'
import Mensaje from './Mensaje';




const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setEsValido }) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje("No es un presupuestro valido");
            return;//rompemos el ciclo de la ejecucion del codigo
        }

        setMensaje('') //sirve para eliminar el alertra en caso que el presupuesto sea valido
        setEsValido(true)

    }
    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label>Definir Presupuesto</label>
                    <input
                        type="number"
                        className='nuevo-presupuesto'
                        placeholder='Añade tu presupuesto'
                        value={presupuesto}
                        onChange={e => setPresupuesto(e.target.value)}
                    />

                </div>
                <input
                    type="submit"
                    value="Añadir"
                />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>

        </div>
    )
}

export default NuevoPresupuesto