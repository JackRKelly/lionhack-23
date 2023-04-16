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

const Bold = tw.span`font-semibold`;
const Italic = tw.span`italic text-primitive-type-faint`;

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
								<Heading>Buy</Heading>
								<ColumnInner>
									<ColumnOfferItem>
										<Bold>500x Tokens</Bold> @ $45.76/token <Italic>($40,000, 0.4 Volume)</Italic>
									</ColumnOfferItem>
									<ColumnOfferItem>
										<Bold>500x Tokens</Bold> @ $45.76/token <Italic>($40,000, 0.4 Volume)</Italic>
									</ColumnOfferItem>
									<ColumnOfferItem>
										<Bold>500x Tokens</Bold> @ $45.76/token <Italic>($40,000, 0.4 Volume)</Italic>
									</ColumnOfferItem>
								</ColumnInner>
							</Column>
							<Column>
								<Heading>Sell</Heading>
								<ColumnInner>
									<ColumnOfferItem>
										<Bold>500x Tokens</Bold> @ $45.76/token <Italic>($40,000, 0.4 Volume)</Italic>
									</ColumnOfferItem>
									<ColumnOfferItem>
										<Bold>500x Tokens</Bold> @ $45.76/token <Italic>($40,000, 0.4 Volume)</Italic>
									</ColumnOfferItem>
									<ColumnOfferItem>
										<Bold>500x Tokens</Bold> @ $45.76/token <Italic>($40,000, 0.4 Volume)</Italic>
									</ColumnOfferItem>
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
