import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, gastosFiltrados, filtro }) => {
  return (

    <div className='listado-gastos contenedor'>


      {
        filtro ? (

          <>
            <h2>{gastosFiltrados.length ? `Los gastos de la categoría ${filtro} son:` : "No hay Gastos aun"}</h2>

            {gastosFiltrados.map(gasto => (
              /* si hay un filtro d efinido iteramos sobre todos los gastos de esa categoria 
              en caso de que no exista pasa por el sagundo .map e solo muestra los gastos totales*/
              <Gasto
                key={gasto.id}
                gasto={gasto}//envio la prop hacia gasto
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        ) : (
          <>
            <h2>{gastos.length ? "Gastos" : "No hay gastos aun"}</h2>
            {gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}//envio la prop hacia gasto
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />)
            )}
          </>
        )
      }
    </div>
  )
}

export default ListadoGastos