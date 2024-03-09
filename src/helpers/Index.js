export const generarId = () =>{
    const random = Math.random().toString(36).substr(2);
    const dateNow = Date.now().toString(36);
    return random + dateNow;
}
/* 
    ESTA FUNCION VA A TOMAR LA FECHA ACTUAL Y SETEARLA PARA QUE SE VEA POR EJ 23 DE JUNIO DE 1988


*/
export const formatearFecha = (fecha) =>{
    const fechaNueva = new Date(fecha);//CREA EL OBJETO FECHA

    const opciones = {//ACA 
        year: 'numeric',
        month: 'long',
        day:'2-digit',

    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)

}