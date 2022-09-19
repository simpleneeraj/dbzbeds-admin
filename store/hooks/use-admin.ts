


import React from 'react';
import userSlice from 'store/slices/user';
import useAppDispatch from './usedispatch';
import useAppSelector from './useselector';
const useAdmin = () => {
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const setUser = React.useCallback((value: string) => {
        dispatch(userSlice.actions.setUser(value))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    // Return Values
    return { setUser, user }

}
export default useAdmin;