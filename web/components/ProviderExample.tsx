import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import type { Network } from "@web3-react/network";
import type { WalletConnect } from "@web3-react/walletconnect";
import type { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

import { getName } from "../utils";
import { hooks as metaMaskHooks, metaMask } from "./connectors/metaMask";
import { hooks as networkHooks, network } from "./connectors/network";
import { hooks as walletConnectHooks, walletConnect } from "./connectors/walletConnect";
import { hooks as walletConnectV2Hooks, walletConnectV2 } from "./connectors/walletConnectV2";

const connectors: [MetaMask | WalletConnect | WalletConnectV2 | Network, Web3ReactHooks][] = [
	[metaMask, metaMaskHooks],
	[walletConnect, walletConnectHooks],
	[walletConnectV2, walletConnectV2Hooks],
	[network, networkHooks]
];

function Child() {
	const { connector } = useWeb3React();
	console.log(`Priority Connector is: ${getName(connector)}`);
	return null;
}

export default function ProviderExample() {
	return (
		<Web3ReactProvider connectors={connectors}>
			<Child />
		</Web3ReactProvider>
	);
}
