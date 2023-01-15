import React from "react";
import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryResult,
} from "react-query";
import { IWord } from "../../helpers/interfaces";
import dictionary from "../../services/dictionary";

type Props = {
	setId: any;
};

const Learn: React.FC<Props> = ({ setId }) => {
	const { status, error, data }: UseQueryResult<IWord[], Error> = useQuery<
		IWord[],
		Error
	>(["sets", setId], () => dictionary.getWords(setId), {
		cacheTime: 99999,
		staleTime: 99999,
	});

	return (
		<div>
			<h1>Learn {setId}</h1>
			{status === "success" && (
				<ul>
					{data.map(({ name, definition, lvl }: IWord, index: number) => {
						return (
							<li key={index}>
								{name} | {definition} | {lvl}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Learn;
