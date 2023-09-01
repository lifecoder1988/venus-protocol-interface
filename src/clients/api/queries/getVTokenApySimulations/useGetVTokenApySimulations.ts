import BigNumber from 'bignumber.js';
import { QueryObserverOptions, useQuery } from 'react-query';
import { Asset, VToken } from 'types';

import getVTokenApySimulations, {
  GetVTokenApySimulationsOutput,
} from 'clients/api/queries/getVTokenApySimulations';
import useGetVTokenInterestRateModel from 'clients/api/queries/getVTokenInterestRateModel/useGetVTokenInterestRateModel';
import { useMulticall3 } from 'clients/web3';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetVTokenApySimulationsOutput,
  Error,
  GetVTokenApySimulationsOutput,
  GetVTokenApySimulationsOutput,
  [FunctionKey.GET_V_TOKEN_APY_SIMULATIONS, { vTokenAddress: string }]
>;

const useGetVTokenApySimulations = (
  {
    asset,
    vToken,
    isIsolatedPoolMarket,
    reserveFactorMantissa,
  }: {
    asset: Asset | undefined;
    vToken: VToken;
    isIsolatedPoolMarket: boolean;
    reserveFactorMantissa?: BigNumber;
  },
  options?: Options,
) => {
  const multicall3 = useMulticall3();
  const { data: interestRateModelData } = useGetVTokenInterestRateModel({ vToken });

  return useQuery(
    [FunctionKey.GET_V_TOKEN_APY_SIMULATIONS, { vTokenAddress: vToken.address }],
    () =>
      getVTokenApySimulations({
        multicall3,
        reserveFactorMantissa: reserveFactorMantissa || new BigNumber(0),
        interestRateModelContractAddress: interestRateModelData?.contractAddress || '',
        isIsolatedPoolMarket,
        asset,
      }),
    {
      ...options,
      enabled:
        (options?.enabled === undefined || options?.enabled) &&
        interestRateModelData?.contractAddress !== undefined &&
        reserveFactorMantissa !== undefined,
    },
  );
};

export default useGetVTokenApySimulations;
