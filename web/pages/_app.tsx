import type { AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import * as Tooltip from "../components/primitives/Tooltip";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const App: AppType = ({ Component, pageProps }) => (
	<Tooltip.Provider>
		<Component {...pageProps} />
		<Toaster
			position="bottom-right"
			toastOptions={{
				className: "border border-primitive-edge bg-primitive"
			}}
		/>
	</Tooltip.Provider>
);

export default trpc.withTRPC(App);
