import React, { useState } from "react";
import PageWrapper from "../wrappers/PageWrapper";
import { Mode } from "../../enums";
import Learn from "../scenes/Learn";
import Edit from "../scenes/Edit";
import ModalInput from "../elements/ModalInput";
import { useSearchParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

type Props = {};
type ModeType = typeof Mode[keyof typeof Mode];

const queryClient = new QueryClient();

const MainPage: React.FC<Props> = () => {
	const [mode, setMode] = useState<ModeType>(Mode.EDIT);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [info, setInfo] = useSearchParams();

	return (
		<QueryClientProvider client={queryClient}>
			<PageWrapper
				mode={mode}
				setMode={setMode}
				setShowModal={setShowModal}
				showModal={showModal}>
				{mode === Mode.LEARN && info.get("set") && (
					<Learn setName={info.get("set")} />
				)}
				{mode === Mode.EDIT && info.get("set") && (
					<Edit setName={info.get("set")} />
				)}
				{showModal && (
					<ModalInput
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				)}
			</PageWrapper>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default MainPage;
