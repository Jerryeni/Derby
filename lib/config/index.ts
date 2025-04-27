import { cookieStorage, createStorage, http } from '@wagmi/core'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc, bscTestnet } from 'wagmi/chains';
// import {mainnet, bsc} from 'wagmi/chains';
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [bsc]

// export const wagmiAdapter = new WagmiAdapter({
//   storage: createStorage({
//     storage: cookieStorage
//   }),
//   ssr: true,
//   projectId,
//   networks
// })

export const config = getDefaultConfig({
  appName: 'DERBY Seed Sale',
  // projectId: projectId||"296924cdb9a40ac2bfe6b78e60779e09",
  // projectId: projectId||"f8bad84b2936cfafb81bf0e463ab30978223b8ff8ec63ea1729d4980df922691",
  projectId: projectId||"6841b4402b47def70769f14929184e66",
  chains: [bsc],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

// export const config = wagmiAdapter.wagmiConfig