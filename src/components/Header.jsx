import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'


const Header = ({ presupuesto, setPresupuesto, esValido, setEsValido, gastos, setGastos }) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {esValido ? (
                <ControlPresupuesto
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={Number(presupuesto)}
                    setPresupuesto={setPresupuesto}
                    setEsValido={setEsValido}
                />
            )
                : (<NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setEsValido={setEsValido}

                />)

            }

        </header>
    )
}

export default Header