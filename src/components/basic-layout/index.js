import { Outlet } from "react-router-dom";
import BasicLayoutHeader from "./BasicLayoutHeader";
import BasicLayoutFooter from "./BasicLayoutFooter";
import "./style";

function BasicLayout() {
  return (
    <div className="page-basic-layout">
      <BasicLayoutHeader />
      <div className="page-basic-body">
        <Outlet />
      </div>
      <BasicLayoutFooter />
    </div>
  );
}


export default BasicLayout;