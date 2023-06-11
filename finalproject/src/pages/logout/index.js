import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { deleteAllCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Authen } from "../../actions/authen";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        deleteAllCookie();
        navigate('/login');
        dispatch(Authen(false))
    }

  return (
    <>
      <Button icon={<LogoutOutlined />} type="primary" danger onClick={handleClick}>
        Đăng xuất
      </Button>
    </>
  );
}
export default Logout;
