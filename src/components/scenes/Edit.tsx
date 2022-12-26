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
	setName: any;
};

const Edit: React.FC<Props> = ({ setName }) => {
	const queryClient = useQueryClient();

	const [createdWord, setCreatedWord] = useState<IWord>({
		name: "",
		definition: "",
		setName: setName,
	});

	const mutation: UseMutationResult<IWord> = useMutation({
		mutationFn: dictionary.createWord,
		onSuccess: (dataResp) => {
			queryClient.setQueryData(["sets", `${setName}`], (oldData: any) =>
				oldData ? [...oldData, { ...createdWord }] : oldData
			);
		},
	});

	const { status, error, data }: UseQueryResult<IWord[], Error> = useQuery<
		IWord[],
		Error
	>(["sets", setName], () => dictionary.getWords(setName), {
		cacheTime: 99999,
		staleTime: 99999,
	});

	const typeWordInfo = (e: any) => {
		setCreatedWord({ ...createdWord, [e.target.name]: e.target.value });
	};

	const addWord = (e: any) => {
		e.preventDefault();
		mutation.mutate(createdWord);
	};

	return (
		<>
			<h1>Edit - {setName}</h1>
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
