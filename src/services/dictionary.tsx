import config from "../config";

const getSets = async () => {
	const requestOptions: any = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	};
	return fetch(`${config.apiUrl}/dictionary/set/?page=0`, requestOptions)
		.then((r) => {
			console.log(r.status);
			if (r.status === 401) {
				window.location.replace(`login`);
			}
			return r.json();
		})
		.catch((error) => {
			return { error: true, errorContent: error };
		});
};

const createWord: any = async (body: any) => {
	const requestOptions: any = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
		credentials: "include",
	};
	return fetch(`http://localhost:5000/dictionary/word`, requestOptions)
		.then((r) => {
			console.log(r.status);
			if (r.status === 401) {
				window.location.replace(`login`);
			}
			return r;
		})
		.catch((error) => {
			return { error: true, errorContent: error };
		});
};

export default { getSets, createWord };
