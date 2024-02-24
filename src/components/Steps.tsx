import { ActionType } from "@/states/actions";
import { StepType, useStateContext } from "@/states/context";

const Steps = () => {
  const { state, dispatch } = useStateContext();

  const handleStepChange = (newStep: StepType) => {
    dispatch({ type: ActionType.SET_STEP, payload: newStep });
  };

  return (
    <ul className="flex items-center gap-4 justify-between border-b pb-4 border-b-white/10">
      <li
        className={`cursor-pointer ${
          state.step === StepType.Overall && "font-bold text-blue-500"
        }`}
        onClick={() => handleStepChange(StepType.Overall)}
      >
        Overall
      </li>
      <li
        className={`cursor-pointer ${
          state.step === StepType.Rewards && "font-bold text-blue-500"
        }`}
        onClick={() => handleStepChange(StepType.Rewards)}
      >
        Rewards
      </li>
      <li
        className={`cursor-pointer ${
          state.step === StepType.Eligibility && "font-bold text-blue-500"
        }`}
        onClick={() => handleStepChange(StepType.Eligibility)}
      >
        Eligibility
      </li>
      <li
        className={`cursor-pointer ${
          state.step === StepType.Tasks && "font-bold text-blue-500"
        }`}
        onClick={() => handleStepChange(StepType.Tasks)}
      >
        Tasks
      </li>
    </ul>
  );
};

export default Steps;
