import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import dictionary from "../services/dictionary";
import { Mode } from "./../enums";
import { useNavigate, useSearchParams } from "react-router-dom";

type ModeType = typeof Mode[keyof typeof Mode];

type Props = {
	children?: React.ReactNode;
	mode: ModeType;
	setMode: (el: ModeType) => void;
	setShowModal: (e: boolean) => void;
	showModal: boolean;
};

interface IData {
	username: string;
	sets: {
		count: number;
		rows: string[];
	};
}

const Sidebar: React.FC<Props> = ({
	mode,
	setMode,
	setShowModal,
	showModal,
}) => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
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
						<li onClick={() => setShowModal(!showModal)}>New Set +</li>
						{data.sets.rows.map((setName, index) => {
							return (
								<li
									key={index}
									onClick={() => {
										setMode(Mode.LEARN);
										setSearchParams({ username: data.username, set: setName });
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
