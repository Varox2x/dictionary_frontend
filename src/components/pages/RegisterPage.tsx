import React, { useState } from "react";
import authentication from "../../services/authentication";

type Props = {};

type TRegisterInfo = {
	email: string;
	password: string;
};

const RegisterPage: React.FC<Props> = () => {
	const [registerInfo, setRegisterInfo] = useState<TRegisterInfo>({
		email: "",
		password: "",
	});

	const typeInfo = (e: any) => {
		setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
	};

    const register = (e: any) => {
        e.preventDefault()
        authentication.register(registerInfo).then((r : any) => console.log(r))
    }

	return (
		<div>
			<h1>Register Page</h1>
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
                <button onClick={(e) => register(e)} >REGISTER</button>
			</form>
		</div>
	);
};

export default RegisterPage;
