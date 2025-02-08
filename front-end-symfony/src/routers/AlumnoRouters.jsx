import { Route, Routes } from 'react-router-dom';
import { TableAlumno } from '../components/Table-Alumno';
import { CreateAndUpdate } from '../components/Create-and-Update';

export const AlumnoRouters = () => {

    return(
        <>
            <Routes>
                <Route path="/" element={<TableAlumno />} />
                <Route path="/create" element={<CreateAndUpdate />} />
                <Route path="/update/:id" element={<CreateAndUpdate />} />
            </Routes>
        </>
    )
}