import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Mode } from "../../enums";
import { useSearchParams } from "react-router-dom";

type ModeType = typeof Mode[keyof typeof Mode];

type Props = {
	children?: React.ReactNode;
	mode: ModeType;
	setMode: (el: ModeType) => void;
	setShowModal: (e: boolean) => void;
	showModal: boolean;
};

const queryClient = new QueryClient();

const PageWrapper: React.FC<Props> = ({
	children,
	mode,
	setMode,
	setShowModal,
	showModal,
}) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Sidebar
					mode={mode}
					setMode={setMode}
					setShowModal={setShowModal}
					showModal={showModal}
				/>
				<div style={{ position: "absolute", top: 0, bottom: 0, left: "300px" }}>
					{children}
				</div>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
};

export default PageWrapper;
