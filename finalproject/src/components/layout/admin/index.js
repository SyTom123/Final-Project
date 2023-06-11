import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Link, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Logout from "../../../pages/logout";
import "./admin.scss";
import SiderMenu from "./SiderMenu";
import { useState } from "react";

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const handleClick = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Layout className="layoutAdmin">
        <div className="layoutAdmin__header">
          <div className= {"layoutAdmin__logo " + (collapsed && "layoutAdmin__logo--fold") }>
            {collapsed ? "Admin" : "ITviec Admin"}
            </div>
          <div className="layoutAdmin__nav">
            <div className="layoutAdmin__icon" onClick={handleClick}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className="layoutAdmin__button">
                <Link to = '/'>
                    <Button icon={<HomeOutlined />} style={{ marginRight: "15px" }}>
                        Trang chủ
                    </Button>
                </Link>
              <Logout />
            </div>
          </div>
        </div>
        <Layout>
          <Sider
            theme="light"
            className="layoutAdmin__sider"
            width={230}
            collapsed={collapsed}
            breakpoint='md'
            onBreakpoint={(broken)=> setCollapsed(broken)}
          >
            <SiderMenu />
          </Sider>
          <Content className="layoutAdmin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default Admin;
