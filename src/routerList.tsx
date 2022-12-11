import React from "react";
import RoutesPaths from "./RoutesPaths";

const MainPage = React.lazy(() => import("./components/pages/MainPage"));
const RegisterPage = React.lazy(
	() => import("./components/pages/RegisterPage")
);
const LoginPage = React.lazy(() => import("./components/pages/LoginPage"));




const routerList = [
	{
		path: RoutesPaths.MainPage.path,
		component: <MainPage />,
	},
	{
		path: RoutesPaths.RegisterPage.path,
		component: <RegisterPage />,
	},
	{
		path: RoutesPaths.LoginPage.path,
		component: <LoginPage />,
	},
];

export default routerList;
