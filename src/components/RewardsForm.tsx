import { ActionType } from "@/states/actions";
import { useStateContext } from "@/states/context";
import { useEffect, useState } from "react";

const RewardsForm = () => {
  const { state, dispatch } = useStateContext();
  const [tokenTypes, setTokenTypes] = useState<string[]>([]);

  useEffect(() => {
    if (state.rewardNetwork && state.rewardTokenType) {
      handleNetworkChange({
        target: { value: state.rewardNetwork.toString() },
      });
      handleTokenTypeChange({ target: { value: state.rewardTokenType } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rewardNetwork, state.rewardTokenType]);

  const handleNetworkChange = (event: any) => {
    const selectedNetwork = event.target.value;
    switch (selectedNetwork) {
      case "97": // BSC_TESTNET
        setTokenTypes([]);
        break;
      case "80001": // MUMBAI
        setTokenTypes(["CPZ"]);
        break;
      case "11155111": // SEPOLIA
        setTokenTypes(["MTO", "UNI"]);
        break;
      default:
        setTokenTypes([]);
        break;
    }

    dispatch({
      type: ActionType.SET_REWARD_NETWORK,
      payload: parseInt(selectedNetwork),
    });
  };

  const handleTokenTypeChange = (event: any) => {
    const selectedTokenType = event.target.value;
    dispatch({
      type: ActionType.SET_REWARD_TOKEN_TYPE,
      payload: selectedTokenType,
    });
  };

  const handleTokenRewardPoolChange = (event: any) => {
    const tokenRewardPool = event.target.value;
    dispatch({
      type: ActionType.SET_TOKEN_REWARD_POOL,
      payload: tokenRewardPool,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label>*Network</label>
        <select
          className="bg-black/50 rounded-3xl px-4 py-2"
          onChange={handleNetworkChange}
          value={state.rewardNetwork ? state.rewardNetwork.toString() : ""}
        >
          <option value="">Select network</option>
          <option value="97">BSC_TESTNET</option>
          <option value="80001">MUMBAI</option>
          <option value="11155111">SEPOLIA</option>
        </select>
        {state?.errors?.some((error) => error.field === "rewardNetwork") && (
          <span className="text-red-500">
            Campaign reward network is required
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label>*Token type</label>
        <select
          className="bg-black/50 rounded-3xl px-4 py-2"
          name=""
          id=""
          onChange={handleTokenTypeChange}
          value={state.rewardTokenType}
        >
          <option value="">Select token type</option>
          {tokenTypes.map((tokenType, index) => (
            <option key={index} value={tokenType}>
              {tokenType}
            </option>
          ))}
        </select>
        {state?.errors?.some((error) => error.field === "rewardTokenType") && (
          <span className="text-red-500">
            Campaign reward token type is required
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label>*Token reward pool</label>
        <input
          className="bg-black/50 rounded-3xl px-4 py-2"
          placeholder="Enter amount"
          value={state.tokenRewardPool}
          onChange={handleTokenRewardPoolChange}
        />
        {state?.errors?.some((error) => error.field === "tokenRewardPool") && (
          <span className="text-red-500">
            {
              state.errors.find((error) => error.field === "tokenRewardPool")
                ?.issue
            }
          </span>
        )}
      </div>
    </div>
  );
};

export default RewardsForm;
