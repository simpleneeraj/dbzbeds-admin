import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import inputfieldSlice from '../context/input';


/**
 * Custom hook for dynamic input fields
 */
const useInput = () => {
    const { actions, initialState, reducer } = inputfieldSlice
    // const [state, dispatch] = React.useReducer(reducer, initialState);
    const [state, setState] = React.useState(initialState);
    // ADD HANDLER

    const addField = React.useCallback(() => {
        // dispatch(actions.addField())
        setState((old) => [...old, {
            id: nanoid(6),
            color: '',
            image: ''
        }])
    }, [state])
    // REMOVE HANDLER

    const removeField = React.useCallback((id: string) => {
        // dispatch(actions.removeField(id))
        setState(state.filter((data) => data.id !== id))
    }, [state])
    // UPDATE HANDLER

    const updateField = React.useCallback((id: number, e: any) => {
        const { value, name } = e.target;
        const draft = state[id]
        const append = {
            ...draft,
            name: draft.color,
            image: draft.image,
        }
        setState([draft])
        // dispatch(actions.updateField({ id: id, [name]: value }))
    }, [state])

    // React.useEffect(() => {
    //     console.table(state);
    // }, [state])
    // Return Values
    return {
        addField,
        removeField,
        updateField,
        inputState: state,
    }

}
export default useInput;