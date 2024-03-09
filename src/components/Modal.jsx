import React, { useEffect, useState } from 'react'
import Mensaje from './Mensaje'
import CerarrModal from '../img/cerrar.svg'

const Modal = ({ setOpenModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
          }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setOpenModal(false)

        }, 500);

    }

    const handleSubmit = e =>{
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios!')
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, fecha, id}) //si pasa la validacion va a guardar la informacion de los states
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerarrModal}
                    alt="Cerrar modal"
                    onClick={ocultarModal} />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}>

                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>{//si existe esta propiedad de gastoEditar.nombre significa que esta editando
                }

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
               
                <div className='campo'>

                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el nombre del Gasto:' 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}/>{//de esta forma cambio el estado con el contenido del campo 
                            //e.target.value toma el valor del campo y se lo asigna a setNombre cambiando asi el State
                        }

                </div>
                <div className='campo'>

                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='cantidad'
                        type="number"
                        placeholder='Añade la cantidad de gasto: Ej 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                         />

                </div>
                <div className='campo'>

                    <label htmlFor="categoria">Categoria</label>
                    <select 
                        id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                        >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos_varios">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
            </form>
        </div>
    )
}

export default Modal