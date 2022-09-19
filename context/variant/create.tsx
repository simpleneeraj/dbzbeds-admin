import { createReducerCTX } from "mini-state";
import { initialState, reducer, actions } from "./slice";

const [VariantsContext, VariantsProvider] = createReducerCTX(
  reducer,
  initialState
);
export { VariantsContext, VariantsProvider, actions as VariantsActions };
