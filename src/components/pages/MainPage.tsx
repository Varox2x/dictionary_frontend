import React, { useState } from "react";
import PageWrapper from "../wrappers/PageWrapper";
import { Mode } from "../../enums";
import { useParams } from "react-router-dom";
import Learn from "../scenes/Learn";
import Edit from "../scenes/Edit";
import convertUrl from "../../helpers/converUrl";

type Props = {};
type ModeType = typeof Mode[keyof typeof Mode];

const MainPage: React.FC<Props> = () => {
	const [mode, setMode] = useState<ModeType>(Mode.EDIT);
	let { id } = useParams();

	return (
		<PageWrapper
			mode={mode}
			setMode={setMode}>
			{mode === Mode.LEARN && id && <Learn setName={convertUrl(id)} />}
			{mode === Mode.EDIT && id && <Edit setName={convertUrl(id)} />}
		</PageWrapper>
	);
};

export default MainPage;
