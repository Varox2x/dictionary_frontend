import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Mode } from "../../enums";

type ModeType = typeof Mode[keyof typeof Mode];

type Props = {
	children?: React.ReactNode;
	mode: ModeType;
	setMode: (el: ModeType) => void;
};

const PageWrapper: React.FC<Props> = ({ children, mode, setMode }) => {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Sidebar mode={mode} setMode={setMode}/>
				<div style={{ position: "absolute", top: 0, bottom: 0, left: "300px" }}>
					{children}
				</div>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
};

export default PageWrapper;
