import { useEffect, useState } from 'react'
import Header from './components/Header'
import 'normalize.css'
import { generarId } from './helpers/Index'
import { Filtros } from './components/Filtros'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos'



function App() {
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []); //compruebo que existe localstorage y si existe los transformo  

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto') ?? 0));
  const [esValido, setEsValido] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)//ventana modal activa

  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFlitro] = useState('') //
  const [gastosFiltrados, setGastosFiltrados] = useState([]) //

  useEffect(() => {

    if (Object.keys(gastoEditar).length > 0) {
      setOpenModal(true)


      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }

  }, [gastoEditar])//lo que va hacer es escuchar cada vez que cambie el state de gastoEditar


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)

  }, [presupuesto])


  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])//convierte una arreglo en string
  }, [gastos])

  useEffect(() => {
    if(filtro)
    {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
    
  }, [filtro])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0) {
      setEsValido(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setOpenModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {

    if (gasto.id) {
      //ACTUALIZAR MODAL
      const gastosActualizados = gastos.map(gastosState => gastosState.id === gasto.id ? gasto : gastosState)
      setGastos(gastosActualizados)
      setGastoEditar({})
      /**
       * en este caso el se crea la variable gastosActualizados donde recorremos todo el arreglo de gastos con el .map
       * dentro del .map creamos la variable gastosState 
       * gastosState.id es el registro que vamos a editar, si es igual o existe dentro del array que vuelva actualizar gasto
       * y los que no cumplan la condicion lo guarda en  gastosState para que no se pierda la informacion
       * y el resultado de todo eso actualiza el state de setGastos
       * ejemplo:
       * tengo tres registros en el array
       * id: REG1
       * id: REG2
       * id: REG3
       * en guardarGastos viene el id: REG2
       * pregunto si existe REG2, si existe entonces significa que voy a editar.
       * se crea gastosActualizado
       * recorro todos los gastos
       * gastosState seria como una copia de los datos que hay en gastos 
       */

    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])//lo que hace toma una copia de gastos y lo guarda en el objeto gasto que viene de modal
    }
    setAnimarModal(false)
    setTimeout(() => {
      setOpenModal(false)

    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={openModal ? "fijar" : " "}> {// cuando el modale este abierto es decir este en true entonces aplica el estilo fijar 
      //pero cuando no este abierto no apliques nada, para eso uso es state de openModal
    }
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        esValido={esValido}
        setEsValido={setEsValido}
      />

      {esValido && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFlitro={setFlitro}

            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />

          </main>


          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="nuevo gasto"
              onClick={handleNuevoGasto} />

          </div>
        </>
      )}
      {openModal &&
        <Modal
          setOpenModal={setOpenModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}



        />}
    </div>


  )
}

export default App
