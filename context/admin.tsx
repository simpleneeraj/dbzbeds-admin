import { createReducerCTX } from "mini-state";

interface ActionTypes {
  type: string;
  payload: any;
}

interface StateType {
  tabName: string;
}

const init = {
  tabName: "General",
};

const ACTIVETAB = "ACTIVETAB";

const reducer = (state: StateType, action: ActionTypes) => {
  switch (action.type) {
    case ACTIVETAB:
      return {
        ...state,
        tabName: action.payload,
      };
    default:
      return state;
  }
};

const actions = {
  setTabName: (value: string) => ({ type: ACTIVETAB, payload: value }),
};

const [AdminContext, AdminProvider] = createReducerCTX(reducer, init);

export { AdminContext, AdminProvider, actions };
