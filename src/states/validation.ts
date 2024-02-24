import { State, StepType } from "./context";

type ValidationResult = {
  fieldsWithIssue: { field: string; issue: string }[];
};

export const validateStep = (
  step: StepType,
  state: State
): ValidationResult => {
  const validationResult: ValidationResult = {
    fieldsWithIssue: [],
  };

  switch (step) {
    case StepType.Overall:
      if (!state.campaignName) {
        validationResult.fieldsWithIssue.push({
          field: "campaignName",
          issue: "Campaign name is required.",
        });
      }

      if (!state.startDate) {
        validationResult.fieldsWithIssue.push({
          field: "startDate",
          issue: "Start date is required.",
        });
      }

      if (!state.campaignDescription) {
        validationResult.fieldsWithIssue.push({
          field: "campaignDescription",
          issue: "Campaign description is required.",
        });
      } else if (state.campaignDescription.length > 2000) {
        validationResult.fieldsWithIssue.push({
          field: "campaignDescription",
          issue: "Campaign description must have a maximum of 2000 characters.",
        });
      }
      break;

    case StepType.Rewards:
      if (!state.rewardNetwork) {
        validationResult.fieldsWithIssue.push({
          field: "rewardNetwork",
          issue: "Reward network is required.",
        });
      }

      if (!state.rewardTokenType) {
        validationResult.fieldsWithIssue.push({
          field: "rewardTokenType",
          issue: "Reward token type is required.",
        });
      }

      if (!state.tokenRewardPool) {
        validationResult.fieldsWithIssue.push({
          field: "tokenRewardPool",
          issue: "Token reward pool is required.",
        });
      } else {
        const tokenRewardPoolValue = state.tokenRewardPool;
        if (
          isNaN(tokenRewardPoolValue) ||
          tokenRewardPoolValue <= 0 ||
          tokenRewardPoolValue >= 100
        ) {
          validationResult.fieldsWithIssue.push({
            field: "tokenRewardPool",
            issue:
              "Token reward pool must be a number greater than 0 and less than 100.",
          });
        }
      }
      break;

    case StepType.Eligibility:
      if (!state.eligibilityNetwork) {
        validationResult.fieldsWithIssue.push({
          field: "eligibilityNetwork",
          issue: "Eligibility network is required.",
        });
      }

      if (!state.eligibilityTokenType) {
        validationResult.fieldsWithIssue.push({
          field: "eligibilityTokenType",
          issue: "Eligibility token type is required.",
        });
      }

      if (!state.minimumBalance) {
        validationResult.fieldsWithIssue.push({
          field: "minimumBalance",
          issue: "Minimum balance is required.",
        });
      }
      break;

    default:
      break;
  }

  return validationResult;
};
