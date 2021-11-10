import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo, USER_FEATURE_KEY } from "@/store/user.slice"

function BasicLayout() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state[USER_FEATURE_KEY].userInfo);

  return (
    <div>
      <h1>Welcome to the app! {userInfo.nickname}</h1>
      <nav>
        <Link to="/">home</Link> | {" "} 
        <Link to="/academy">academy</Link>| {" "} 
        <Link to="/protocol">protocol</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
      <button onClick={() => dispatch(setUserInfo({ id: 1, nickname: "Jax" }))}>button</button>
    </div>
  );
}


export default BasicLayout;