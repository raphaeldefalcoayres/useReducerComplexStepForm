import { ActionType } from "@/states/actions";
import { useStateContext } from "@/states/context";
import { useEffect, useState } from "react";

const EligibilityForm = () => {
  const { state, dispatch } = useStateContext();
  const [tokenTypes, setTokenTypes] = useState<string[]>([]);

  const handleTokenTypeChange = (event: any) => {
    const selectedTokenType = event.target.value;
    dispatch({
      type: ActionType.SET_ELIGIBILITY_TOKEN_TYPE,
      payload: selectedTokenType,
    });
  };

  const handleMinimumBalanceChange = (event: any) => {
    const minimumBalance = event.target.value;
    dispatch({
      type: ActionType.SET_MINIMUM_BALANCE,
      payload: minimumBalance,
    });
  };

  useEffect(() => {
    if (state.eligibilityNetwork && state.eligibilityTokenType) {
      handleNetworkChange({
        target: { value: state.eligibilityNetwork.toString() },
      });
      handleTokenTypeChange({ target: { value: state.eligibilityTokenType } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.eligibilityNetwork, state.eligibilityTokenType]);

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
      type: ActionType.SET_ELIGIBILITY_NETWORK,
      payload: parseInt(selectedNetwork),
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <h3>Minimum token balance</h3>
      <div className="flex flex-col gap-2">
        <label>*Network</label>
        <select
          className="bg-black/50 rounded-3xl px-4 py-2"
          onChange={handleNetworkChange}
          value={
            state.eligibilityNetwork ? state.eligibilityNetwork.toString() : ""
          }
        >
          <option value="">Select network</option>
          <option value="97">BSC_TESTNET</option>
          <option value="80001">MUMBAI</option>
          <option value="11155111">SEPOLIA</option>
        </select>
        {state.errors.some((error) => error.field === "eligibilityNetwork") && (
          <span className="text-red-500">
            {
              state.errors.find((error) => error.field === "eligibilityNetwork")
                ?.issue
            }
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
          value={state.eligibilityTokenType}
        >
          <option value="">Select token type</option>
          {tokenTypes.map((tokenType, index) => (
            <option key={index} value={tokenType}>
              {tokenType}
            </option>
          ))}
        </select>
        {state.errors.some(
          (error) => error.field === "eligibilityTokenType"
        ) && (
          <span className="text-red-500">
            {
              state.errors.find(
                (error) => error.field === "eligibilityTokenType"
              )?.issue
            }
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label>*Minimum balance</label>
        <input
          className="bg-black/50 rounded-3xl px-4 py-2"
          placeholder="Enter amount"
          onChange={handleMinimumBalanceChange}
          value={state.minimumBalance}
        />
        {state.errors.some((error) => error.field === "minimumBalance") && (
          <span className="text-red-500">
            {
              state.errors.find((error) => error.field === "minimumBalance")
                ?.issue
            }
          </span>
        )}
      </div>
    </div>
  );
};

export default EligibilityForm;
