import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

// For development purposes, we'll use a demo project ID
// In production, replace this with your actual WalletConnect project ID from https://cloud.walletconnect.com
const projectId = 'demo-project-id-for-development';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism],
  connectors: [
    injected(),
    // Only include WalletConnect if we have a valid project ID
    ...(projectId !== 'demo-project-id-for-development' ? [walletConnect({ projectId })] : []),
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