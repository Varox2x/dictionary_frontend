import React, { useState } from "react";
import authentication from "../../services/authentication";
import { useNavigate } from "react-router-dom";

type Props = {};

type TLoginInfo = {
	email: string;
	password: string;
};

const LoginPage: React.FC<Props> = () => {
	const navigate = useNavigate();
	const [loginInfo, setLoginInfo] = useState<TLoginInfo>({
		email: "",
		password: "",
	});

	const typeInfo = (e: any) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
	};

	const login = (e: any) => {
		e.preventDefault();
		authentication.login(loginInfo).then((r: any) => {
			if (r.status == 200) {
				navigate("/");
			}
            // else generate global error
		});
	};

	return (
		<div>
			<h1>Login Page</h1>
			<form>
				<label>Email:</label>
				<input
					name={"email"}
					onChange={(e) => typeInfo(e)}
				/>
				<label>Password:</label>
				<input
					name={"password"}
					onChange={(e) => typeInfo(e)}
				/>
				<button onClick={(e) => login(e)}>Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
