import React from "react";
import { ContextType } from "context/variant";
import { initialState, reducer, actions } from "./slice";
import { useFetchBedVariantsById } from "network-requests/queries";
import { getBedVariantById } from "network-requests/api";
import { VariantsActions } from "./create";

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

  // const { data, isFetched, refetch } = useFetchBedVariantsById(id);

  const setData = React.useCallback(async () => {
    const data: any = await getBedVariantById(id);
    const general = {
      size: data?.size,
      image: data?.image,
      basePrice: data?.price?.basePrice,
      salePrice: data?.price?.salePrice,
    };
    dispatch(VariantsActions.GENERAL(general));
    dispatch(VariantsActions.COLOR(data?.accessories?.color));
    dispatch(VariantsActions.HEADBOARD(data?.accessories?.headboard));
    dispatch(VariantsActions.STORAGE(data?.accessories?.feet));
    dispatch(VariantsActions.FEET(data?.accessories?.mattress));
    dispatch(VariantsActions.MATTRESS(data?.accessories?.storage));

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
  }, [id]);

  React.useEffect(() => {
    void setData();
  }, [setData]);

  console.log({ SIMLE: state });

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
