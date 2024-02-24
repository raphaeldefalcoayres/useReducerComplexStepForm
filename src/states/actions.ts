import { StepType } from "./context";

export enum ActionType {
  SET_STEP = "SET_STEP",
  SET_CAMPAIGN_NAME = "SET_CAMPAIGN_NAME",
  SET_START_DATE = "SET_START_DATE",
  SET_END_DATE = "SET_END_DATE",
  SET_CAMPAIGN_DESCRIPTION = "SET_CAMPAIGN_DESCRIPTION",
  SET_ENABLE_GOOGLE_RECAPTCHA = "SET_ENABLE_GOOGLE_RECAPTCHA",
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  SET_REWARD_NETWORK = "SET_REWARD_NETWORK",
  SET_REWARD_TOKEN_TYPE = "SET_REWARD_TOKEN_TYPE",
  SET_TOKEN_REWARD_POOL = "SET_TOKEN_REWARD_POOL",
  SET_ELIGIBILITY_NETWORK = "SET_ELIGIBILITY_NETWORK",
  SET_ELIGIBILITY_TOKEN_TYPE = "SET_ELIGIBILITY_TOKEN_TYPE",
  SET_MINIMUM_BALANCE = "SET_MINIMUM_BALANCE",
  RESET_STEP = "RESET_STEP",
}

export type Action =
  | { type: ActionType.SET_STEP; payload: StepType }
  | { type: ActionType.SET_CAMPAIGN_NAME; payload: string }
  | { type: ActionType.SET_START_DATE; payload: string }
  | { type: ActionType.SET_END_DATE; payload: string }
  | { type: ActionType.SET_CAMPAIGN_DESCRIPTION; payload: string }
  | { type: ActionType.SET_ENABLE_GOOGLE_RECAPTCHA; payload: boolean }
  | { type: ActionType.NEXT_STEP }
  | { type: ActionType.PREV_STEP }
  | { type: ActionType.SET_REWARD_NETWORK; payload: number }
  | { type: ActionType.SET_REWARD_TOKEN_TYPE; payload: string }
  | { type: ActionType.SET_TOKEN_REWARD_POOL; payload: number }
  | { type: ActionType.SET_ELIGIBILITY_NETWORK; payload: number }
  | { type: ActionType.SET_ELIGIBILITY_TOKEN_TYPE; payload: string }
  | { type: ActionType.SET_MINIMUM_BALANCE; payload: number }
  | { type: ActionType.RESET_STEP };
