import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import dictionary from "../services/dictionary";
import { Mode } from "./../enums";
import { useSearchParams } from "react-router-dom";
import { ISet } from "../helpers/interfaces";

type ModeType = typeof Mode[keyof typeof Mode];

type Props = {
	children?: React.ReactNode;
	mode: ModeType;
	setMode: (el: ModeType) => void;
	setShowModal: (e: boolean) => void;
	showModal: boolean;
};

const Sidebar: React.FC<Props> = ({
	mode,
	setMode,
	setShowModal,
	showModal,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { status, error, data }: UseQueryResult<ISet[], Error> = useQuery<
		ISet[],
		Error
	>(["ownedSets"], dictionary.getOwnedSets, {
		staleTime: 99999,
	});
	return (
		<ul style={{ position: "absolute", top: 0, bottom: 0, left: 0 }}>
			<li>Zestawy:</li>
			{status === "success" && (
				<>
					<ul>
						<li onClick={() => setShowModal(!showModal)}>New Set +</li>
						{data.map((setName, index) => {
							return (
								<li
									key={index}
									onClick={() => {
										setMode(Mode.LEARN);
										setSearchParams({ setId: `${setName.id}` });
									}}>
									<p key={index}>{setName.name}</p>
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
