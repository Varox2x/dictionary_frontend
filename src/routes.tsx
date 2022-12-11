import { Routes, Route } from "react-router-dom";
import React from "react";
import routerList from "./routerList";
import RouteWrapper from "./components/wrappers/RouteWrapper";
import PageWrapper from "./components/wrappers/PageWrapper";
const MainPage = React.lazy(() => import("./components/pages/MainPage"));

export const routes = (
	<Routes>
		<Route
			key={`/`}
			path={"/"}
			element={<RouteWrapper children={<MainPage />} />}
		/>
		{routerList.map(({ path, component }) => {
			return (
				<Route
					key={`${path}`}
					path={path}
					element={<RouteWrapper children={component} />}
				/>
			);
		})}
		<Route
			path="*"
			element={<p>Not found page</p>}
		/>
	</Routes>
);
