import { useCallback, useEffect, useState } from "react";
import * as Dropdown from "../components/primitives/Dropdown";
import { getAddChainParameters } from "../utils/chains";
import { hooks, metaMask } from "../utils/metaMask";
import { tw } from "../utils/tw";
import { Arbitrum } from "./icons/Arbitrum";
import { Avalanch } from "./icons/Avalanch";
import { EthereumIcon } from "./icons/Ethereum";
import { MetaMaskIcon } from "./icons/MetaMask";
import { Button } from "./primitives/Button";
import * as NavigationPrimitive from "./primitives/Navigation";

const RootWrapper = tw.div`fixed top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center`;

const iconClassName = "mr-2 h-7 w-7 text-primitive-type-extra-faint";

interface ChainInfo {
	[key: number]: {
		icon: React.ReactNode;
	};
}

const chainInfo: ChainInfo = {
	1: {
		icon: <EthereumIcon className={iconClassName} />
	},
	43114: {
		icon: <Avalanch className={iconClassName} />
	},
	42161: {
		icon: <Arbitrum className={iconClassName} />
	}
};

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

interface Props {
	activeChainId: number;
	switchChain: (chainId: number) => void;
	chainIds: number[];
}

export const Navigation = () => {
	const [desiredChainId, setDesiredChainId] = useState<number | undefined>(1);
	const activeChainId = useChainId();
	const accounts = useAccounts();
	const isActivating = useIsActivating();

	const isActive = useIsActive();
	const provider = useProvider();
	const ENSNames = useENSNames(provider);

	const [error, setError] = useState<Error | undefined>(undefined);

	// attempt to connect eagerly on mount
	useEffect(() => {
		// void metaMask.connectEagerly().catch(() => {
		// 	console.debug("Failed to connect eagerly to metamask");
		// });
	}, []);

	useEffect(() => {
		if (error !== undefined) {
			console.error(error);
		}
	}, [error]);

	useEffect(() => {
		console.log(activeChainId);
	}, [activeChainId]);

	useEffect(() => {
		if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
			setDesiredChainId(activeChainId);
		}
	}, [desiredChainId, activeChainId]);

	const switchChain = useCallback(
		async (desiredChainId: number) => {
			setDesiredChainId(desiredChainId);

			try {
				if (
					// If we're already connected to the desired chain, return
					desiredChainId === activeChainId ||
					// If they want to connect to the default chain and we're already connected, return
					(desiredChainId === -1 && activeChainId !== undefined)
				) {
					setError(undefined);
					return;
				}

				await metaMask.activate(getAddChainParameters(desiredChainId));

				setError(undefined);
			} catch (error) {
				setError(error as Error);
			}
		},
		[metaMask, activeChainId, setError]
	);

	return (
		<RootWrapper>
			<NavigationPrimitive.Root>
				<NavigationPrimitive.Item>
					<NavigationPrimitive.NextLink href="/">Home</NavigationPrimitive.NextLink>
				</NavigationPrimitive.Item>
				<NavigationPrimitive.Item>
					<NavigationPrimitive.NextLink href="/components">Components</NavigationPrimitive.NextLink>
				</NavigationPrimitive.Item>
				<NavigationPrimitive.Item>
					<Dropdown.Root
						sideOffset={14}
						trigger={
							<Button shade="primitive-borderless" size="xs">
								{(desiredChainId && chainInfo[desiredChainId]?.icon) ?? (
									<MetaMaskIcon className={iconClassName} />
								)}
								Swap
							</Button>
						}
					>
						<Dropdown.CheckboxItem
							label="Ethereum"
							icon={<EthereumIcon className={iconClassName} />}
							checked={desiredChainId === 1}
							onCheckedChange={(value) => {
								if (value) setDesiredChainId(1);
							}}
						/>

						<Dropdown.CheckboxItem
							label="Avalanche"
							icon={<Avalanch className={iconClassName} />}
							checked={desiredChainId === 43114}
							onCheckedChange={(value) => {
								if (value) setDesiredChainId(43114);
							}}
						/>
						<Dropdown.CheckboxItem
							label="Arbitrum"
							icon={<Arbitrum className={iconClassName} />}
							checked={desiredChainId === 42161}
							onCheckedChange={(value) => {
								if (value) setDesiredChainId(42161);
							}}
						/>
					</Dropdown.Root>
				</NavigationPrimitive.Item>
				<NavigationPrimitive.Item>
					{isActive ? (
						error ? (
							<NavigationPrimitive.Button
								onClick={() => (desiredChainId ? switchChain(desiredChainId) : null)}
							>
								Try again?
							</NavigationPrimitive.Button>
						) : (
							<NavigationPrimitive.Button
								onClick={() => {
									if (metaMask?.deactivate) {
										void metaMask.deactivate();
									} else {
										void metaMask.resetState();
									}
									setDesiredChainId(undefined);
								}}
							>
								Disconnect
							</NavigationPrimitive.Button>
						)
					) : (
						<NavigationPrimitive.Button
							className="whitespace-nowrap"
							onClick={() => (desiredChainId ? switchChain(desiredChainId) : null)}
							disabled={isActivating || !desiredChainId}
						>
							Connect
						</NavigationPrimitive.Button>
					)}
				</NavigationPrimitive.Item>
			</NavigationPrimitive.Root>
		</RootWrapper>
	);
};
