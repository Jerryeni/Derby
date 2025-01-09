import { cookieStorage, createStorage, http } from '@wagmi/core'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc, bscTestnet } from 'wagmi/chains';
// import {mainnet, bsc} from 'wagmi/chains';
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [bscTestnet]

// export const wagmiAdapter = new WagmiAdapter({
//   storage: createStorage({
//     storage: cookieStorage
//   }),
//   ssr: true,
//   projectId,
//   networks
// })

export const config = getDefaultConfig({
  appName: 'UCC Seed Sale',
  projectId: projectId||"296924cdb9a40ac2bfe6b78e60779e09",
  chains: [bscTestnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

// export const config = wagmiAdapter.wagmiConfig