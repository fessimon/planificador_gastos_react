import React from 'react'

const Mensaje = ({ children, tipo }) => {
    return (
        <div className={`alerta ${tipo}`}>{children}</div>
        /*
            LO QUE HACEMOS ACA EN TRAER ALERTA QUE ES UNA CLASE DE CSS
            TIPO VA A SER EL TIPO DE ALERTA
            CHILDREN VA A SER TODO EL MENSAJE
        */
    )
}

export default Mensaje