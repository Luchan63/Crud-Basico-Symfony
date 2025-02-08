export const alumnoReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALUMNOS':
            return action.payload;
        case 'GET_ALUMNOS_ID':
            return action.payload;
        case 'ADD_ALUMNOS':
            return [...state, action.payload];
        case 'EDIT_ALUMNOS':
            state.map(alumnos => {
                if (alumnos.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return alumnos;
            });
        case 'DELETE_ALUMNOS':
            return state.filter(alumnos => alumnos.id !== action.payload);
        default:
            return state;
    }
}
