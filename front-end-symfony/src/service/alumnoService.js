import axios from "axios";
const BASEURL = 'http://localhost:8000/alumnos';

export const findAll = async () => {
    try {
    const response = await axios.get(BASEURL);
    return response;
    }catch (error){
        console.error("Error al cargar a los alumnos: ", error);
    }

    return null;
};

export const findById = async (id) => {
    try {
    const response = await axios.get(`${BASEURL}/${id}`);
    return response;
    } catch (error) {
        console.log('Error al cargar el alumnos: ', error)
    }

    return null;
};

export const save = async (alumno) => {
    try {
        const response = await axios.post(`${BASEURL}/create`, alumno);
        return response;
    } catch (error) {
        console.error("Error al guardar el alumno:", error);
    }
    return undefined;
}

export const update = async (alumno) => {
    try {
        const response = await axios.patch(`${BASEURL}/edit/${alumno.id}`, alumno);
        return response;
    } catch (error) {
        console.error("Error al actualizar el alumno:", error);
    }
    return undefined;
}

export const remove = async (id) => {
    try {
        await axios.delete(`${BASEURL}/remove/${id}`);
    } catch (error) {
        console.error("Error al eliminar el alumno:", error);
    }
}