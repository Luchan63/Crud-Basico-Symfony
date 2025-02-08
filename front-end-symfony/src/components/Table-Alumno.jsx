import { useEffect } from "react";
import { useAlumno } from "../hooks/useAlumnos";
import { NavLink, useNavigate } from "react-router-dom";

export const TableAlumno = () => {
  const navigate = useNavigate();
  const { getAlumnos, alumnosList, handlerAlumnosSelect, handlerRemove , alumnoSelect } = useAlumno();

  useEffect(() => {
    getAlumnos();
  }, []);

  const handlerEdit = (alumno) => {  // ✅ Pasar el objeto directamente
    handlerAlumnosSelect(
      {
        ...alumno
      }
    );
    navigate(`/update/${alumno.id}`);
};

const handlerDelete = (id) => {
  handlerRemove(id);
};

console.log('Alumno2', alumnoSelect);

  return (
    <>
      <section className='container'>
        <h1>Datos de los Alumno</h1>
        <NavLink className='btn btn-important' to={'/create'} >Agregar Alumnos</NavLink>
        <table className='table-form'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {alumnosList ? (
              alumnosList.map((alumno) => (
                <tr key={alumno.id}>
                  <td>{alumno.id}</td>
                  <td>{alumno.dni}</td>
                  <td>{alumno.name}</td>
                  <td>{alumno.phone}</td>
                  <td>{alumno.address}</td>
                  <td><button className='btn btn-important' onClick={() => handlerEdit(alumno)}>Editar</button></td>
                  <td><button className='btn btn-red' onClick={() => handlerDelete(alumno.id)}>Eliminar</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}