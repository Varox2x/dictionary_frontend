import React from "react";

type Props = {
	setName: string;
};

const Learn: React.FC<Props> = ({ setName }) => {
	return <div>Learn {setName}</div>;
};

export default Learn;
