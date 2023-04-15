import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

import { MAINNET_CHAINS } from "../../utils/chains";

export const [walletConnectV2, hooks] = initializeConnector<WalletConnectV2>(
	(actions) =>
		new WalletConnectV2({
			actions,
			options: {
				//@ts-ignore
				projectId: process.env.walletConnectProjectId,
				chains: Object.keys(MAINNET_CHAINS).map(Number)
			}
		})
);
