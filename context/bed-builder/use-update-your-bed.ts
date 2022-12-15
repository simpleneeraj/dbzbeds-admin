

import React from 'react';
import { actions } from "./slice";
import { UpdateYourBedContext } from './update';

const useUpdateYourBed = () => {
    const { dispatch, state } = React.useContext(UpdateYourBedContext);
    const onUpdate = React.useCallback((key: string, value: any) => {
        dispatch(actions.updateYourBedVariants({ key, value }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Return Values
    return {
        yourBedState: state,
        onUpdate: React.useMemo(() => onUpdate, [onUpdate])
    }

}
export default useUpdateYourBed;