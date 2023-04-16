import clsx from "clsx";
import type { NextPage } from "next";
import MetaMaskCard from "../components/MetaMaskCard";
import { Navigation } from "../components/Navigation";
import { Heading } from "../components/primitives/Heading";
import { InnerColumn, OuterColumn, PageWrapper, Section } from "../components/primitives/Layout";
import { tw } from "../utils/tw";
const Column = tw.div`flex-1`;

const ColumnInner = tw.div`mt-4 rounded-md border bg-primitive-faint border-primitive-edge p-3 flex flex-col space-y-1`;

const ColumnWrapper = tw.div`mt-4 flex flex-row gap-4`;

const ColumnOfferItem = tw.div`block pb-1 border-b border-primitive-edge-faint last:pb-0 last:border-b-0`;

const ColumnItem = ({ isBuy = false }: { isBuy?: boolean }) => {
	return (
		<ColumnOfferItem>
			<div className="border-r inline-flex flex-row items-center mr-2 pr-2 w-14">
				<span
					className="text-xl font-semibold tracking-tight text-primitive-type"
					suppressHydrationWarning
				>
					{Math.ceil(Math.random() * 999)}
					<span className="text-base ml-px text-primitive-type">x</span>
				</span>
			</div>
			<div className="inline-flex flex-row items-center border-r mr-2 pr-2 w-32">
				<div>
					<span className="text-xs align-super text-primitive-type">$</span>
					<div className="text-xl inline-block text-primitive-type" suppressHydrationWarning>
						{(Math.random() * 99).toFixed(2)}
					</div>
					<span className="text-xs text-primitive-type-faint">
						<span className="mx-0.5">/</span> token
					</span>
				</div>
			</div>
			<div className="inline-flex flex-row items-center">
				<span className="text-primitive-type text-base">
					<span className={clsx("text-xs align-super", isBuy ? "text-red-600" : "text-green-600")}>
						$
					</span>
					<div
						className={clsx("text-xl inline-block", isBuy ? "text-red-600" : "text-green-600")}
						suppressHydrationWarning
					>
						{Math.ceil(Math.random() * 99999)}
					</div>
					<span className="text-primitive-type-extra-faint font-light mx-1">/</span>
					<span suppressHydrationWarning>{(Math.random() * 0.99).toFixed(2)} Volume</span>
				</span>
			</div>
		</ColumnOfferItem>
	);
};

const Home: NextPage = () => {
	return (
		<PageWrapper>
			<Navigation />

			<OuterColumn>
				<Section>
					<InnerColumn width="third">
						<MetaMaskCard />

						<ColumnWrapper>
							<Column>
								<Heading>Buy Tokens</Heading>
								<ColumnInner>
									<ColumnItem isBuy />
									<ColumnItem isBuy />
									<ColumnItem isBuy />
								</ColumnInner>
							</Column>
							<Column>
								<Heading>Sell Token</Heading>
								<ColumnInner>
									<ColumnItem />
									<ColumnItem />
									<ColumnItem />
								</ColumnInner>
							</Column>
						</ColumnWrapper>
					</InnerColumn>
				</Section>
			</OuterColumn>
		</PageWrapper>
	);
};

export default Home;
