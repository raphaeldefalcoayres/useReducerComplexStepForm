import { ActionType } from "@/states/actions";
import { useStateContext } from "@/states/context";
import { ChangeEvent } from "react";

const OverwallForm = () => {
  const { state, dispatch } = useStateContext();

  const handleCampaignNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SET_CAMPAIGN_NAME,
      payload: event.target.value,
    });
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SET_START_DATE, payload: event.target.value });
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SET_END_DATE, payload: event.target.value });
  };

  const handleCampaignDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: ActionType.SET_CAMPAIGN_DESCRIPTION,
      payload: event.target.value,
    });
  };

  const handleEnableGoogleRecaptchaChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: ActionType.SET_ENABLE_GOOGLE_RECAPTCHA,
      payload: event.target.checked,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label>*Campaign name</label>
        <input
          className="bg-black/50 rounded-3xl px-4 py-2"
          placeholder="Enter campaign name"
          value={state.campaignName}
          onChange={handleCampaignNameChange}
        />
        {state?.errors?.some((error) => error.field === "campaignName") && (
          <span className="text-red-500">Campaign name is required</span>
        )}
      </div>

      <div className="flex gap-8">
        <div className="flex flex-col gap-2">
          <label>*Start date</label>
          <input
            type="datetime-local"
            className="bg-black/50 rounded-3xl px-4 py-2"
            value={state.startDate}
            onChange={handleStartDateChange}
          />
          {state?.errors?.some((error) => error.field === "startDate") && (
            <span className="text-red-500">
              Campaign start date is required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>End date</label>
          <input
            type="datetime-local"
            className="bg-black/50 rounded-3xl px-4 py-2"
            value={state.endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>*Campaign description</label>
        <textarea
          className="bg-black/50 rounded-3xl px-4 py-2"
          placeholder="Enter campaign description"
          value={state.campaignDescription}
          onChange={handleCampaignDescriptionChange}
        />
        {state?.errors?.some(
          (error) => error.field === "campaignDescription"
        ) && (
          <span className="text-red-500">Campaign description is required</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="checkbox"
          checked={state.enableGoogleRecaptcha}
          onChange={handleEnableGoogleRecaptchaChange}
        />{" "}
        <label htmlFor="checkbox">Enable Google reCAPTCHA</label>
      </div>
    </div>
  );
};

export default OverwallForm;
