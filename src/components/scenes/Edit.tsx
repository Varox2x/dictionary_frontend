import React, { useState } from "react";
import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryResult,
	UseMutationResult,
} from "react-query";
import dictionary from "../../services/dictionary";
import { IWord } from "../../helpers/interfaces";

type Props = {
	setId: any;
};

const Edit: React.FC<Props> = ({ setId }) => {
	const queryClient = useQueryClient();

	const [createdWord, setCreatedWord] = useState<IWord>({
		name: "",
		definition: "",
	});

	const mutation: UseMutationResult<IWord> = useMutation({
		mutationFn: dictionary.createWord,
		onSuccess: (dataResp: any) => {
			if (dataResp.status == 200) {
				queryClient.setQueryData(["sets", `${setId}`], (oldData: any) =>
					oldData ? [...oldData, { ...createdWord }] : oldData
				);
			}
		},
	});

	const { status, error, data }: UseQueryResult<IWord[], Error> = useQuery<
		IWord[],
		Error
	>(["sets", setId], () => dictionary.getWords(setId), {
		cacheTime: 99999,
		staleTime: 99999,
	});

	const typeWordInfo = (e: any) => {
		setCreatedWord({ ...createdWord, [e.target.name]: e.target.value });
	};

	const addWord = (e: any) => {
		e.preventDefault();
		mutation.mutate({ ...createdWord, set_id: setId });
	};

	return (
		<>
			<h1>Edit - {setId}</h1>
			<div>
				<form>
					<p>Add word to set:</p>
					<label>Name:</label>
					<input
						name={"name"}
						value={createdWord.name}
						onChange={(e) => typeWordInfo(e)}
					/>
					<label>Definition:</label>
					<input
						name={"definition"}
						value={createdWord.definition}
						onChange={(e) => typeWordInfo(e)}
					/>
					<button onClick={(e) => addWord(e)}>ADD WORD</button>
				</form>
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
		</>
	);
};

export default Edit;
