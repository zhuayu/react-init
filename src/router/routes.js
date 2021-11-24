import * as React from "react";
import BasicLayout from "@components/basic-layout";

const Home = React.lazy(() => import("@views/Home"));
const Academy = React.lazy(() => import("@views/Academy"));
const Bible = React.lazy(() => import("@views/Bible"));
const Question = React.lazy(() => import("@views/Question"));
const Task = React.lazy(() => import("@views/Task"));
const Protocol = React.lazy(() => import("@views/Protocol"));
const Notification = React.lazy(() => import("@views/Notification"));
const MyPlan = React.lazy(() => import("@views/My/Plan"));
const MyQuestion = React.lazy(() => import("@views/My/Question"));
const MyKlass = React.lazy(() => import("@views/My/Klass"));
const MySetting = React.lazy(() => import("@views/My/Setting"));
const Work = React.lazy(() => import("@views/Work"));

const routes = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/academy",
        element: <Academy />,
      },
      {
        path: "/bible",
        element: <Bible />,
      },
      {
        path: "/question",
        element: <Question />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      {
        path: "/my/plan",
        element: <MyPlan />,
      },
      {
        path: "/my/class",
        element: <MyKlass />,
      },
      {
        path: "/my/setting",
        element: <MySetting />,
      },
      {
        path: "/my/question",
        element: <MyQuestion />,
      },
      {
        path: "/work",
        element: <Work />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
    ],
  },
  {
    path: "/protocol",
    element: <Protocol />,
  },
];

export default routes;
