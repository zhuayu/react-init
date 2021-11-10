import * as React from "react";
import BasicLayout from "../components/Layout/BasicLayout";

const Home = React.lazy(() => import("../views/Home"));
const Academy = React.lazy(() => import("../views/Academy"));
const Protocol = React.lazy(() => import("../views/Protocol/index.js"));

const routes = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        name: "ccdd",
        meta: "斗西家计划",
        element: <Home />
      },
      { 
        path: "/academy",
        meta: "斗西家学社",
        element: <Academy />
      }
    ]
  },
  { 
    path: "/protocol", 
    element: <Protocol /> 
  }
];

export default routes;