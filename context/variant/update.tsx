import React from "react";
import { ContextType } from "context/variant";
import { initialState, reducer, actions } from "./slice";
import { getBedVariantById } from "network-requests/api";
import { VariantsActions } from "./create";
import {
    useFetchBedVariantsById,
    useFetchHeadboardVariantById,
} from "network-requests/queries";
import { useRouter } from "next/router";

interface UpdateVariantProviderProps {
    id: string;
}

interface IContextType {
    state: ContextType;
    dispatch?: any;
}

const UpdateVariantContext = React.createContext<IContextType>({
    state: initialState,
    dispatch: () => initialState,
});

const UpdateVariantProvider = ({
    id,
    children,
}: React.PropsWithChildren<UpdateVariantProviderProps>) => {
    const router = useRouter();
    const [state, dispatch] = React.useReducer(reducer, initialState);

    console.log({ state: router.pathname });

    const { data, isFetched } =
        router.pathname === "/headboard/variants/update"
            ? // eslint-disable-next-line react-hooks/rules-of-hooks
              (useFetchHeadboardVariantById(id) as any)
            : // eslint-disable-next-line react-hooks/rules-of-hooks
              (useFetchBedVariantsById(id) as any);

    console.log({ data });

    React.useEffect(() => {
        if (isFetched && data) {
            const general = {
                size: data?.size,
                image: data?.image,
                basePrice: data?.price?.basePrice,
                salePrice: data?.price?.salePrice,
                isDraft: data?.isDraft,
            };
            dispatch(VariantsActions.GENERAL(general));
            dispatch(VariantsActions.COLOR(data?.accessories?.color));
            dispatch(VariantsActions.HEADBOARD(data?.accessories?.headboard));
            dispatch(VariantsActions.STORAGE(data?.accessories?.storage));
            dispatch(VariantsActions.FEET(data?.accessories?.feet));
            dispatch(VariantsActions.MATTRESS(data?.accessories?.mattress));
        }
    }, [data, isFetched]);

    console.log({ accessories: data?.accessories });

    return (
        <UpdateVariantContext.Provider value={{ state, dispatch }}>
            {children}
        </UpdateVariantContext.Provider>
    );
};

export {
    actions as UpdateVariantActions,
    UpdateVariantContext,
    UpdateVariantProvider,
};

// dispatch({
//   type: "WHOLESTATE",
//   payload: {
//     general: {
//       size: data?.size,
//       image: data?.image,
//       basePrice: data?.price?.basePrice,
//       salePrice: data?.price?.salePrice,
//       // ...data?.price,
//     } as any,
//     color: data?.accessories?.color,
//     headboard: data?.accessories?.headboard,
//     feet: data?.accessories?.feet,
//     mattress: data?.accessories?.mattress,
//     storage: data?.accessories?.storage,
//   },
// });
