import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

// WalletConnect project ID - Replace with your actual project ID
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({
      appName: 'Web3Social',
      appLogoUrl: '/icons/icon-192x192.png',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});