import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import dictionary from "../services/dictionary";
import { Mode } from "./../enums";
import { useNavigate } from "react-router-dom";

type ModeType = typeof Mode[keyof typeof Mode];

type Props = {
	children?: React.ReactNode;
	mode: ModeType;
	setMode: (el: ModeType) => void;
};

interface IData {
	count: number;
	rows: string[];
}

const Sidebar: React.FC<Props> = ({ mode, setMode }) => {
	const navigate = useNavigate();
	const { status, error, data }: UseQueryResult<IData, Error> = useQuery<
		IData,
		Error
	>(["setsNames"], dictionary.getSets, {
		staleTime: 99999,
	});
	return (
		<ul style={{ position: "absolute", top: 0, bottom: 0, left: 0 }}>
			<li>Zestawy:</li>
			{status === "success" && (
				<>
					<ul>
						{data.rows.map((setName, index) => {
							return (
								<li
									onClick={() => {
										setMode(Mode.LEARN);
										navigate(`/${setName}`);
									}}>
									<p key={index}>{setName}</p>
								</li>
							);
						})}
					</ul>
				</>
			)}
			<li onClick={() => setMode(Mode.EDIT)}>{Mode.EDIT}</li>
			<li onClick={() => setMode(Mode.SETTINGS)}>{Mode.SETTINGS}</li>
		</ul>
	);
};

export default Sidebar;
