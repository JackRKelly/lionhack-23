import type { NextPage } from "next";
import MetaMaskCard from "../components/MetaMaskCard";
import { Navigation } from "../components/Navigation";
import { InnerColumn, OuterColumn, PageWrapper, Section } from "../components/primitives/Layout";
import { tw } from "../utils/tw";

const Link = tw.a`text-primary-bold font-semibold`;

const Column = tw.div`rounded-md border bg-primitive-faint border-primitive-edge flex-grow p-3`;

const ColumnWrapper = tw.div`mt-4 flex flex-row gap-4`;

const Home: NextPage = () => {
	return (
		<PageWrapper>
			<Navigation />

			<OuterColumn>
				<Section>
					<InnerColumn width="third">
						<MetaMaskCard />
						<ColumnWrapper>
							<Column>col 1</Column>
							<Column>col 2</Column>
						</ColumnWrapper>
					</InnerColumn>
				</Section>
			</OuterColumn>
		</PageWrapper>
	);
};

export default Home;
