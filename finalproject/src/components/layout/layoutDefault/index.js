import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content, Footer } from "antd/es/layout/layout";
import "./layoutDefault.scss";
import Header from "./header";
function LayoutDefault() {
  return (
    <>
      <Layout className="layoutDefault">
        <Header />
        <Content className="layoutDefault__content">
          <Outlet />
        </Content>
        <Footer className="layoutDefault__footer">Coppyright by Nguyen Tien Sy</Footer>
      </Layout>
    </>
  );
}
export default LayoutDefault;
