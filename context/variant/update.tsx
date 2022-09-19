import React from "react";
import { ContextType } from "context/variant";
import { initialState, reducer, actions } from "./slice";
import { useFetchBedVariantsById } from "network-requests/queries";

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
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { data } = useFetchBedVariantsById(id);

  console.log({ SIMLE: data });

  React.useEffect(() => {
    dispatch({
      type: "WHOLESTATE",
      payload: {
        general: {
          size: data?.size,
          image: data?.image,
          basePrice: data?.price?.basePrice,
          salePrice: data?.price?.salePrice,
          // ...data?.price,
        } as any,
        color: data?.accessories?.color,
        headboard: data?.accessories?.headboard,
        feet: data?.accessories?.feet,
        mattress: data?.accessories?.mattress,
        storage: data?.accessories?.storage,
      },
    });
  }, [data]);

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
