import { useReducer, useState } from "react"
import { alumnoReducer } from "./refucer/alumnoReducer";
import { findAll, save, update, remove} from "../service/alumnoService";
import { useNavigate } from "react-router-dom";


const initialAlumno = {
    id: 0,
    dni: "",
    name: "",
    phone: "",
    address: ""
}

export const useAlumno = () => {
    const navigate = useNavigate();
    const [alumnos, setAlumnos] = useState(initialAlumno);
    const [alumnosList, dispatch] = useReducer(alumnoReducer, []);
    const [alumnoSelect, setAlumnoSelect] = useState(initialAlumno)

    const { dni, name, phone, address } = alumnos;
    
    const getAlumnos = async () => {
        try {
            const response = await findAll();
            dispatch({
                type: 'GET_ALUMNOS',
                payload: response.data
            });
        } catch (e) {
            console.error("Error al obtener la lista de alumnos:", e);
        }
    };

    const removeAlumno = async (id) => {
        try {
            const response = await remove(id);
            dispatch({
                type: 'DELETE_ALUMNOS',
                payload: response.data
            });
        } catch (e) {
            console.error("Error al eliminar el alumno:", e);
        }
    };

    const handlerChange = ({ target }) => {
        const { name, value } = target;
        setAlumnos({
            ...alumnos,
            [name]: value
        });
    };


    const handlerAddAlumnos = async (alumno) => {
        let response;

        if (alumno.id === 0) {
            response = await save(alumno);
        } else {
            response = await update(alumno)
        }

        if (response && response.data) {
            dispatch({
                type: (alumno.id === 0) ? 'ADD_ALUMNOS' : 'EDIT_ALUMNOS',
                payload: response.data
            });
        };
    };


    const handlerSubmit = async (event) => {
        event.preventDefault();

        if (dni.trim() === "" || name.trim() === "" || phone.trim() === "" || address.trim() === "") {
            return;
        };

        const alumno = {
            ...alumnos,
        };

        await handlerAddAlumnos(alumno);
        alert('Alumno creado con exito');
        setAlumnos(initialAlumno);

        // aqui va la url de redireccion
        navigate('/');
        window.location.reload();

    }

    const handlerRemove = async (id) => {
        await removeAlumno(id);
        alert('Alumno eliminado con exito');
        localStorage.removeItem("alumnoSelect");
        window.location.reload();
    };

    const handlerAlumnosSelect = (alumno) => {
        setAlumnoSelect(alumno);
        localStorage.setItem("alumnoSelect", JSON.stringify(alumno)); // Guardar en localStorage
    };


    return {
        // datos
        alumnos,
        alumnosList,
        alumnoSelect,
        // mapear datos
        setAlumnos,
        // funciones
        handlerChange,
        handlerSubmit,
        handlerAlumnosSelect,
        handlerRemove,
        //servicios
        getAlumnos

    }
} 