import { useState, useEffect, Suspense } from 'react';
import { useRoutes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setUserInfo } from "@/store/user.slice";
import routes from "@/router/routes.js";
import NProgress from "nprogress";
import cookies from "js-cookie";
import userService from "@/global/service/user";
import "nprogress/nprogress.css";

function App() {
  // NProgress
  const location = useLocation();
  NProgress.start();
  useEffect(() => {
    NProgress.done();
  }, [location]);

  // InitApp && setUserInfo
  const dispatch = useDispatch();
  const [appInit, setAppInit] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try{
        const token = cookies.get("web_token");
        if(token) {
          const userInfo = await userService.getUserInfo();
          dispatch(setUserInfo(userInfo));
        }
      }catch {};
      setAppInit(true);
    }
    !appInit && fetchData();
    NProgress.done();
  }, [appInit, dispatch]);

  const element = useRoutes(routes);
  return appInit ? (
    <>
      <Suspense fallback={<></>}>
        {element}
      </Suspense>
    </>
  ) : null;
}


export default App;