"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Action } from "./actions";

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: ReactNode;
};

export enum StepType {
  Overall = "Overall",
  Rewards = "Rewards",
  Eligibility = "Eligibility",
  Tasks = "Tasks",
}

type ErrorType = {
  field: string;
  issue: string;
};

export type State = {
  step: StepType;
  campaignName: string;
  startDate: string;
  endDate: string;
  campaignDescription: string;
  enableGoogleRecaptcha: boolean;
  rewardNetwork: number;
  rewardTokenType: string;
  tokenRewardPool: number;
  eligibilityNetwork: number;
  eligibilityTokenType: string;
  minimumBalance: number;
  errors: ErrorType[];
};

const StateContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}) => {
  const INITIAL_STATE: State = {
    step: StepType.Overall,
    campaignName: "",
    startDate: "",
    endDate: "",
    campaignDescription: "",
    enableGoogleRecaptcha: false,
    rewardNetwork: 0,
    rewardTokenType: "",
    tokenRewardPool: 0,
    eligibilityNetwork: 0,
    eligibilityTokenType: "",
    minimumBalance: 0,
    errors: [],
  };

  const storedState =
    typeof window !== "undefined"
      ? localStorage.getItem("appState")
      : undefined;

  const [state, dispatch] = useReducer(
    reducer,
    storedState ? JSON.parse(storedState) : INITIAL_STATE
  );

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext deve ser usado dentro de um StateProvider"
    );
  }
  return context;
};
