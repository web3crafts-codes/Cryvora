import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useEffect } from 'react';
import GatewayABI from '../contracts/GatewayABI.json';
import { bsc } from 'wagmi/chains';
import { getCookie, setCookie } from '../utils/cookie';

export const TOKEN_CONTRACT_ADDRESS = '0x918F568c48722cEa3a33534057255126B49D627f';
export const GATEWAY_CONTRACT_ADDRESS = '0xF38362D9101ee7CA72356Beee62af89806C91CCe';

export function useGateway() {
  const { address, isConnected } = useAccount();

  // Load referrer address from URL query parameter on mount and save to cookie & localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref && ref.startsWith('0x') && ref.length === 42) {
        setCookie('referrer_address', ref, 30);
        try {
          localStorage.setItem('referrer_address', ref);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  // Fetch claim fee from contract
  const { data: rawClaimFee } = useReadContract({
    address: GATEWAY_CONTRACT_ADDRESS as `0x${string}`,
    abi: GatewayABI,
    functionName: 'claimFee',
    chainId: bsc.id,
    query: { staleTime: 300_000, gcTime: 600_000 },
  });

  // Fetch claim status for current wallet
  const { data: hasClaimed, refetch: refetchClaimStatus } = useReadContract({
    address: GATEWAY_CONTRACT_ADDRESS as `0x${string}`,
    abi: GatewayABI,
    functionName: 'hasClaimed',
    args: [address],
    chainId: bsc.id,
    query: {
      enabled: !!address,
    },
  });

  // Contract write mutation
  const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Refetch claim status on successful transaction
  useEffect(() => {
    if (isSuccess) {
      refetchClaimStatus();
    }
  }, [isSuccess, refetchClaimStatus]);

  const claimTokens = async () => {
    try {
      const referrerCookie = getCookie('referrer_address') || (typeof localStorage !== 'undefined' ? localStorage.getItem('referrer_address') : null);
      const referrerAddress =
        referrerCookie && referrerCookie.startsWith('0x') && referrerCookie.length === 42
          ? referrerCookie
          : '0x0000000000000000000000000000000000000000';

      const valueToPay = rawClaimFee ? (rawClaimFee as bigint) : parseEther('0.0071');

      writeContract({
        address: GATEWAY_CONTRACT_ADDRESS as `0x${string}`,
        abi: GatewayABI,
        functionName: 'claimTokens',
        args: [referrerAddress],
        value: valueToPay,
      });
    } catch (err) {
      console.error('Claim contract error:', err);
    }
  };

  const formattedClaimAmount = '12,500';
  const formattedReferralReward = '6,250';

  const formattedClaimFee = rawClaimFee
    ? formatEther(rawClaimFee as bigint)
    : '0.0071';

  return {
    address,
    isConnected,
    hasClaimed: !!hasClaimed,
    claimFee: formattedClaimFee,
    claimAmount: formattedClaimAmount,
    referralReward: formattedReferralReward,
    claimTokens,
    isPending,
    isConfirming,
    isSuccess,
    writeError,
    txHash: hash,
  };
}
