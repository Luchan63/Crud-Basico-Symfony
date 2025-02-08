import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAlumno } from "../hooks/useAlumnos"

export const CreateAndUpdate = () => {
    const { handlerSubmit, handlerChange, alumnos, setAlumnos, alumnoSelect } = useAlumno()

    const { id, dni, name, phone, address } = alumnos;

    useEffect(() => {
        const storedAlumno = localStorage.getItem("alumnoSelect");
        
        if (storedAlumno) {
            setAlumnos(JSON.parse(storedAlumno));  // Recuperar datos guardados
        }
    }, []);


    return (
        <>
            <section className="container">
                <h2>{id > 0 ? 'Editar Alumno' : 'Agregar Alumno'}</h2>
                <form onSubmit={handlerSubmit}>
                    <div className="form-group">

                        <input
                            type="hidden"
                            name="id"
                            value={id || 0} />

                        <label htmlFor="dni">DNI o NIE</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={dni || ""}
                            required
                            onChange={handlerChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name || ""}
                            required
                            onChange={handlerChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone || ""}
                            required
                            onChange={handlerChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address || ""}
                            required
                            onChange={handlerChange} />
                    </div>
                    <button type="submit" className="btn btn-important">{id > 0 ? 'Ediar' : 'Guardar'}</button>
                </form>
                <NavLink to={'/'} className="btn btn-red">Volver</NavLink>
            </section>
        </>
    )
}