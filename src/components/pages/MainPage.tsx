import React, { useEffect, useState } from "react";
import PageWrapper from "../wrappers/PageWrapper";
import { Mode } from "../../enums";
import Learn from "../scenes/Learn";
import Edit from "../scenes/Edit";
import ModalInput from "../elements/ModalInput";
import { useSearchParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { IData } from "../../helpers/interfaces";
type Props = {};
type ModeType = typeof Mode[keyof typeof Mode];

const queryClient = new QueryClient();

const MainPage: React.FC<Props> = () => {
	const [mode, setMode] = useState<ModeType>(Mode.EDIT);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [info, setInfo] = useSearchParams();

	useEffect(() => {
		const data: IData | undefined = queryClient.getQueryData("setsNames");
		if (data?.username != info.get("username")) {
			console.log("Current doesn't belong to you");
		}
	}, [info]);

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
