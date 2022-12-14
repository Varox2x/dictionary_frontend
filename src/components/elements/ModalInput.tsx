import React, { useState } from "react";
import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryResult,
} from "react-query";
import dictionary from "../../services/dictionary";

type Props = { setShowModal: (e: boolean) => void; showModal: boolean };

const ModalInput: React.FC<Props> = ({ showModal, setShowModal }) => {
	const queryClient = useQueryClient();

	const [setName, setSetName] = useState<string>("");

	const mutation = useMutation({
		mutationFn: () => dictionary.createSet(setName),
		onSuccess: (dataResp: any) => {
			if (dataResp.status == 200) {
				queryClient.setQueryData(["setsNames"], (oldData: any) => {
					if (oldData) {
						let data = { ...oldData };
						data.sets.rows.push(setName);
						return data;
					}
				});
			}
		},
	});

	return (
		<div
			style={{
				position: "absolute",
				margin: "auto",
				background: "blue",
				width: "500px",
				height: "300px",
			}}>
			<textarea
				onChange={(e) => setSetName(e.target.value)}
				value={setName}
			/>
			<button onClick={() => setShowModal(!showModal)}>CLOSE</button>
			<button onClick={() => mutation.mutate()}>ADD</button>
		</div>
	);
};

export default ModalInput;
