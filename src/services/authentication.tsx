import config from "../config";

const register: any = async (body: any) => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	};
	return fetch(`${config.apiUrl}/auth/register`, requestOptions)
		.then((r) => {
			return r;
		})
		.catch((error) => {
			return { error: true, errorContent: error };
		});
};

const login: any = async (body: any) => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	};
	return fetch(`http://localhost:5000/auth/login`, requestOptions)
		.then((r) => {
			return r;
		})
		.catch((error) => {
			return { error: true, errorContent: error };
		});
};

export default { register, login };
