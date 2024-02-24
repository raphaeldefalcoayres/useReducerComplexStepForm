import { Action, ActionType } from "./actions";
import { State, StepType } from "./context";
import { validateStep } from "./validation";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_STEP:
      return { ...state, step: action.payload };
    case ActionType.SET_CAMPAIGN_NAME:
      return {
        ...state,
        campaignName: action.payload,
        errors: state?.errors?.filter(
          (error) => error.field !== "campaignName"
        ),
      };
    case ActionType.SET_START_DATE:
      return {
        ...state,
        startDate: action.payload,
        errors: state?.errors?.filter((error) => error.field !== "startDate"),
      };
    case ActionType.SET_END_DATE:
      return {
        ...state,
        endDate: action.payload,
      };
    case ActionType.SET_CAMPAIGN_DESCRIPTION:
      if (action.payload.length <= 2000) {
        return {
          ...state,
          campaignDescription: action.payload,
          errors: state?.errors?.filter(
            (error) => error.field !== "campaignDescription"
          ),
        };
      } else {
        return {
          ...state,
          campaignDescription: action.payload,
          errors: [
            ...state?.errors?.filter(
              (error) => error.field !== "campaignDescription"
            ),
            {
              field: "campaignDescription",
              issue:
                "Campaign description must have a maximum of 2000 characters.",
            },
          ],
        };
      }
    case ActionType.SET_ENABLE_GOOGLE_RECAPTCHA:
      return {
        ...state,
        enableGoogleRecaptcha: action.payload,
        errors: state?.errors?.filter(
          (error) => error.field !== "enableGoogleRecaptcha"
        ),
      };
    case ActionType.NEXT_STEP:
      const validationResult = validateStep(state.step, state);
      if (validationResult.fieldsWithIssue.length === 0) {
        const currentStepIndex = Object.values(StepType).indexOf(state.step);
        const nextStepIndex = currentStepIndex + 1;
        const nextStep =
          nextStepIndex < Object.values(StepType).length
            ? Object.values(StepType)[nextStepIndex]
            : state.step;
        return { ...state, step: nextStep, errors: [] };
      } else {
        return { ...state, errors: validationResult.fieldsWithIssue };
      }
    case ActionType.PREV_STEP:
      const prevStepIndex = Object.values(StepType).indexOf(state.step) - 1;
      const prevStep =
        prevStepIndex >= 0
          ? Object.values(StepType)[prevStepIndex]
          : state.step;
      return { ...state, step: prevStep };
    case ActionType.SET_REWARD_NETWORK:
      return {
        ...state,
        rewardNetwork: action.payload,
        errors: state?.errors?.filter(
          (error) => error.field !== "rewardNetwork"
        ),
      };
    case ActionType.SET_REWARD_TOKEN_TYPE:
      return {
        ...state,
        rewardTokenType: action.payload,
        errors: state?.errors?.filter(
          (error) => error.field !== "rewardTokenType"
        ),
      };
    case ActionType.SET_TOKEN_REWARD_POOL:
      const tokenRewardPoolValue = action.payload;
      if (
        isNaN(tokenRewardPoolValue) ||
        tokenRewardPoolValue <= 0 ||
        tokenRewardPoolValue >= 100
      ) {
        return {
          ...state,
          tokenRewardPool: action.payload,
          errors: [
            ...state?.errors?.filter(
              (error) => error.field !== "tokenRewardPool"
            ),
            {
              field: "tokenRewardPool",
              issue:
                "Token reward pool must be a number greater than 0 and less than 100.",
            },
          ],
        };
      } else {
        return {
          ...state,
          tokenRewardPool: action.payload,
          errors: state?.errors?.filter(
            (error) => error.field !== "tokenRewardPool"
          ),
        };
      }
    case ActionType.SET_ELIGIBILITY_NETWORK:
      return {
        ...state,
        eligibilityNetwork: action.payload,
        errors: state?.errors?.filter(
          (error) => error.field !== "eligibilityNetwork"
        ),
      };
    case ActionType.SET_ELIGIBILITY_TOKEN_TYPE:
      return {
        ...state,
        eligibilityTokenType: action.payload,
        errors: state?.errors?.filter(
          (error) => error.field !== "eligibilityTokenType"
        ),
      };
    case ActionType.SET_MINIMUM_BALANCE:
      return {
        ...state,
        minimumBalance: action.payload,
        errors: state?.errors?.filter(
          (error) => error.field !== "minimumBalance"
        ),
      };
    case ActionType.RESET_STEP:
      switch (state.step) {
        case StepType.Overall:
          return {
            ...state,
            campaignName: "",
            startDate: "",
            endDate: "",
            campaignDescription: "",
            enableGoogleRecaptcha: false,
          };
        case StepType.Rewards:
          return {
            ...state,
            rewardNetwork: 0,
            rewardTokenType: "",
            tokenRewardPool: 0,
          };
        case StepType.Eligibility:
          return {
            ...state,
            eligibilityNetwork: 0,
            eligibilityTokenType: "",
            minimumBalance: 0,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
