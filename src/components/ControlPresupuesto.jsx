import React, { useEffect, useState } from 'react'
import { formatearFecha, generarId } from '../helpers/Index'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setEsValido }) => {

    const [porcentaje, setPorcentaje] = useState(0)

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        /* 
        el metodo reduce tiene dos valores (acumulador, y una instancia)
        
        */
        const totalDisponible = presupuesto - totalGastado;

        //calcular porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)


        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);

    }, [gastos])//cada vez quje gastos cambie, se va a ejecutar useEffect

    const formatearCantidad = (cantidad) => {
        return Number(cantidad).toLocaleString("en-US", { style: "currency", currency: "USD" })

    }

    const handleReset = () => {
        const resultado = confirm("Esta seguro resetear aplicacion?")

        if(resultado){
            setPresupuesto(0)
            setGastos([])
            setEsValido(false)
        }
     }


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas' >
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "negativo" : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? "#negativo" : '#3b82f6'

                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />

            </div>
            <div className='contenido-presupuesto'>
                <button
                    type='button'
                    className='reset-app'
                    onClick={handleReset}>
                    Resetear APP
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? "negativo" : " "}`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto 