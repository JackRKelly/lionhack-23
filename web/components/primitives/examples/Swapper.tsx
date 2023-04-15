import { useState } from "react";
import { Arbitrum } from "../../icons/Arbitrum";
import { Avalanch } from "../../icons/Avalanch";
import { Etherium } from "../../icons/Etherium";
import { Button } from "../Button";
import * as Dropdown from "../Dropdown";

enum Crypto {
	Etherium,
	Avalanch,
	Arbitrum
}

export const Swapper = () => {
	const [selected, setSelected] = useState<Crypto>(Crypto.Etherium);

	const iconClassName = "mr-2 h-7 w-7 text-primitive-type-extra-faint";

	return (
		<Dropdown.Root
			trigger={
				<Button>
					{(() => {
						if (selected === Crypto.Etherium) {
							return <Etherium className={iconClassName} />;
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
				label="Etherium"
				icon={<Etherium className={iconClassName} />}
				checked={selected === Crypto.Etherium}
				onCheckedChange={(value) => {
					if (value) setSelected(Crypto.Etherium);
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
