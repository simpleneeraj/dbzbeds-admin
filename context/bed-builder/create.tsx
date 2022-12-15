import { createReducerCTX } from "mini-state";
import { initialState, reducer } from "./slice";

export const [CreateYourBedContext, CreateYourBedProvider] = createReducerCTX(
  reducer,
  initialState
);
