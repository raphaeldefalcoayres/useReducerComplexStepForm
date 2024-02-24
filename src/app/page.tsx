"use client";

import OverwallForm from "@/components/OverallForm";
import Steps from "@/components/Steps";

import EligibilityForm from "@/components/EligibilityForm";
import RewardsForm from "@/components/RewardsForm";
import { ActionType } from "../states/actions";
import { StepType, useStateContext } from "../states/context";

export default function Home() {
  const { state, dispatch } = useStateContext();

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-white/10 rounded-3xl p-8 min-h-[550px] min-w-[550px] flex flex-col gap-4">
        <Steps />
        {state.step === StepType.Overall && <OverwallForm />}
        {state.step === StepType.Rewards && <RewardsForm />}
        {state.step === StepType.Eligibility && <EligibilityForm />}

        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: ActionType.RESET_STEP })}
            className="bg-black rounded-3xl py-2 px-8 w-fit"
          >
            Reset
          </button>

          <button
            disabled={state.step === StepType.Overall}
            onClick={() => dispatch({ type: ActionType.PREV_STEP })}
            className="bg-black rounded-3xl py-2 px-8 w-fit disabled:opacity-50"
          >
            Back
          </button>

          <button
            onClick={() => dispatch({ type: ActionType.NEXT_STEP })}
            className="bg-black rounded-3xl py-2 px-8 w-fit"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
