import React from 'react'


export const Filtros = ({filtro, setFlitro}) => {
    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar Gastos </label>
                    <select

                        value={filtro}
                        onChange={e =>setFlitro(e.target.value)}
                    
                    >
                        <option value="">-- Todas las Catergorias --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos_varios">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
            </form>

        </div>
    )
}
