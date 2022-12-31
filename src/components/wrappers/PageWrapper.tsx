import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Mode } from "../../enums";

type ModeType = typeof Mode[keyof typeof Mode];

type Props = {
	children?: React.ReactNode;
	mode: ModeType;
	setMode: (el: ModeType) => void;
	setShowModal: (e: boolean) => void;
	showModal: boolean;
};


const PageWrapper: React.FC<Props> = ({
	children,
	mode,
	setMode,
	setShowModal,
	showModal,
}) => {
	return (
		<>
				<Sidebar
					mode={mode}
					setMode={setMode}
					setShowModal={setShowModal}
					showModal={showModal}
				/>
				<div style={{ position: "absolute", top: 0, bottom: 0, left: "300px" }}>
					{children}
				</div>
		</>
	);
};

export default PageWrapper;
