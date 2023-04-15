import { useState } from "react";
import { Arbitrum } from "../../icons/Arbitrum";
import { Avalanch } from "../../icons/Avalanch";
import { Ethereum } from "../../icons/Ethereum";
import { Button } from "../Button";
import * as Dropdown from "../Dropdown";

enum Crypto {
	Ethereum,
	Avalanch,
	Arbitrum
}

export const Swapper = () => {
	const [selected, setSelected] = useState<Crypto>(Crypto.Ethereum);

	const iconClassName = "mr-2 h-7 w-7 text-primitive-type-extra-faint";

	return (
		<Dropdown.Root
			trigger={
				<Button>
					{(() => {
						if (selected === Crypto.Ethereum) {
							return <Ethereum className={iconClassName} />;
						} else if (selected === Crypto.Avalanch) {
							return <Avalanch className={iconClassName} />;
						} else {
							return <Arbitrum className={iconClassName} />;
						}
					})()}
					Swap
				</Button>
			}
		>
			<Dropdown.CheckboxItem
				label="Ethereum"
				icon={<Ethereum className={iconClassName} />}
				checked={selected === Crypto.Ethereum}
				onCheckedChange={(value) => {
					if (value) setSelected(Crypto.Ethereum);
				}}
			/>

			<Dropdown.CheckboxItem
				label="Avalanche"
				icon={<Avalanch className={iconClassName} />}
				checked={selected === Crypto.Avalanch}
				onCheckedChange={(value) => {
					if (value) setSelected(Crypto.Avalanch);
				}}
			/>
			<Dropdown.CheckboxItem
				label="Arbitrum"
				icon={<Arbitrum className={iconClassName} />}
				checked={selected === Crypto.Arbitrum}
				onCheckedChange={(value) => {
					if (value) setSelected(Crypto.Arbitrum);
				}}
			/>
		</Dropdown.Root>
	);
};
