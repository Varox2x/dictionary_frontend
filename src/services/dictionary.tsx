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
	return fetch(`${config.apiUrl}/dictionary/word`, requestOptions)
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

const getWords = async (setName: string) => {
	const requestOptions: any = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	};
	return fetch(`${config.apiUrl}/dictionary/set/${setName}`, requestOptions)
		.then((r) => {
			console.log(r);
			if (r.status === 401) {
				window.location.replace(`login`);
			}
			return r.json();
		})
		.catch((error) => {
			return { error: true, errorContent: error };
		});
};

const createSet = async (setName: string) => {
	const requestOptions: any = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	};
	return fetch(`${config.apiUrl}/dictionary/set/${setName}`, requestOptions)
		.then((r) => {
			if (r.status === 401) {
				window.location.replace(`login`);
			}
			// return r.json();
			return r;
		})
		.catch((error) => {
			return { error: true, errorContent: error };
		});
};

export default { getSets, createWord, getWords, createSet };
