import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import dictionary from "../../services/dictionary";
import { IWord } from "../../helpers/interfaces";

type Props = {
	setName: string;
};

const Edit: React.FC<Props> = ({ setName }) => {
	const queryClient = useQueryClient();

	const [createdWord, setCreatedWord] = useState<IWord>({
		name: "",
		definition: "",
		setName: setName,
	});

	const mutation = useMutation({
		mutationFn: dictionary.createWord,
		onSuccess: (dataResp) => {
			queryClient.setQueryData(["sets", `${setName}`], (oldData: any) =>
				oldData ? [...oldData, { ...createdWord }] : oldData
			);
		},
	});

	return (
		<>
			<h1>Edit - {setName}</h1>;
			<div>
				<form>
					<p>Add word to set:</p>
					<label>Name:</label>
					<label>Definition:</label>
				</form>
			</div>
		</>
	);
};

export default Edit;
