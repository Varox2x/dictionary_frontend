import React from "react";
import Sidebar from "../Sidebar";

type Props = {
	children?: React.ReactNode;
};

const PageWrapper: React.FC<Props> = ({ children }) => {
	return (
		<>
			<Sidebar />
			<div style={{ position: "absolute", top: 0, bottom: 0, left: "300px" }}>
				{children}
			</div>
		</>
	);
};

export default PageWrapper;
