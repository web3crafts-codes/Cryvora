import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';

const projectId = '944d6fd0168fb4cec9d7d40697a66373';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'Cryvora Web3 Ecosystem',
    projectId,
  }
);

export const config = createConfig({
  connectors,
  chains: [bsc],
  ssr: true,
  transports: {
    [bsc.id]: http(),
  },
});
