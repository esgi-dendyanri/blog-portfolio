import { lazy, ReactElement } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SingleArticle from "./pages/SingleArticle";
const Home = lazy(() => import('./pages/Home'));

type routeItem = {
    path: string,
    key: string,
    element: ReactElement,
}

type routes = routeItem & {
    routes?: routeItem[]
}

const ROUTES: routes[] = [
    {
        path: "/",
        key: "ROOT",
        element: <Home />,
        routes: []
    },
    {
        path: "/articles",
        key: "ROOT",
        element: <Home />,
        routes: []
    },
    {
        path: "/articles/:slug",
        key: "ROOT",
        element: <SingleArticle />,
        routes: []
    },
    // {
    //     path: "/login",
    //     key: "LOGIN",
    //     exact: true,
    //     element: Login,
    //     routes: []
    // },
    // {
    //     path: "/app",
    //     exact: false,
    //     key: "APP",
    //     element: props => {
    //         if (!localStorage.getItem("token")) {
    //             return <Redirect to={"/"} />;
    //         }
    //         return <RenderRoutes {...props} />;
    //     },
    //     routes: [
    //         {
    //             path: "/app",
    //             key: "APP_ROOT",
    //             exact: true,
    //             element: Home,
    //         }
    //     ],
    // },
];

// export default ROUTES

const Routing: Function = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route, i) => {
          return (<Route
              {...route}
            />)
        })}

        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;