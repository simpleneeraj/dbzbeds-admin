

import React from 'react';
import { actions } from "./slice";
import { CreateYourBedContext } from './create';

const useCreateYourBed = () => {
    const { dispatch, state } = React.useContext(CreateYourBedContext);
    const onUpdate = React.useCallback((key: string, value: any) => {
        dispatch(actions.updateYourBedVariants({ key, value }));
    }, [])
    // Return Values
    return {
        yourBedState: state,
        onUpdate: React.useMemo(() => onUpdate, [onUpdate])
    }

}
export default useCreateYourBed;