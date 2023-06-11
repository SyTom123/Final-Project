/* eslint-disable no-unused-vars */
import logo from "../../../assets/images/logo.png";
import { Button } from "antd";
import {
  LoginOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import Logout from "../../../pages/logout";
import { useSelector } from "react-redux";

function Header() {
  const token = getCookie("token");
  const authen = useSelector((state) => state.AuthenReducers);
  return (
    <>
      <div className="layoutDefault__header">
        <div className="layoutDefault__headerLogo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="layoutDefault__headerRight">
          {token ? (
            <div>
              <Link to="/admin">
                <Button icon={<UserOutlined />} style={{ marginRight: "15px" }}>
                  Quản lý
                </Button>
              </Link>
              <Logout />
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button
                  icon={<LoginOutlined />}
                  style={{ marginRight: "15px" }}
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button icon={<PlusCircleOutlined />} type="primary">
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Header;
