import React from "react";
import { initialState, reducer, actions, StateTypes } from "./slice";
import { useFetchBedVariantsById } from "network-requests/queries";

interface UpdateVariantProviderProps {
  id: string;
}

interface IContextType {
  state: StateTypes;
  dispatch?: any;
}

export const UpdateYourBedContext = React.createContext<IContextType>({
  state: initialState,
  dispatch: () => initialState,
});

export const UpdateYourBedProvider = ({
  id,
  children,
}: React.PropsWithChildren<UpdateVariantProviderProps>) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, isFetched } = useFetchBedVariantsById(id) as any;

  const onUpdate = React.useCallback((key: string, value: any) => {
    const { updateYourBedVariants } = actions;
    dispatch(updateYourBedVariants({ key, value }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (isFetched && data) {
      const general = {
        color: data.color,
        image: data?.image,
        basePrice: data?.price?.basePrice,
        salePrice: data?.price?.salePrice,
        isDraft: data?.isDraft,
      };
      // onUpdate("general", value)
      // onUpdate("feet", value)
      // onUpdate("headboard", value)
      // onUpdate("mattress", value)
      // onUpdate("storage", value)
    }
  }, [data, isFetched]);

  console.log({ accessories: data?.accessories });

  return (
    <UpdateYourBedContext.Provider value={{ state, dispatch }}>
      {children}
    </UpdateYourBedContext.Provider>
  );
};

// dispatch(actions.GENERAL(general));
// dispatch(actions.COLOR(data?.accessories?.color));
// dispatch(actions.HEADBOARD(data?.accessories?.headboard));
// dispatch(actions.STORAGE(data?.accessories?.storage));
// dispatch(actions.FEET(data?.accessories?.feet));
// dispatch(actions.MATTRESS(data?.accessories?.mattress));
