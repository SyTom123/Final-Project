import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Authen } from "../../actions/authen";
import { setCookie } from "../../helpers/cookie";
import { getCompany } from "../../services/companyService";

function Login() {
  const rules = [{ required: true, message: "Bắt buộc" }];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const email = values.email;
    const password = values.password;
    const checkExitCompany = await getCompany(email, password);
    if (checkExitCompany.length > 0) {
      setCookie("companyName", checkExitCompany[0].companyName, 1);
      setCookie("email", checkExitCompany[0].email, 1);
      setCookie("phone", checkExitCompany[0].phone, 1);
      setCookie("token", checkExitCompany[0].token, 1);
      setCookie("id", checkExitCompany[0].id, 1);

      navigate("/");
      dispatch(Authen(true));
    } else {
      form.resetFields();
      api.error({
        message: "Login not successfully",
        description: "User or password not correct. Please try again",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={22}>
          <div className="login">
            <Card title="Đăng nhập">
              <Form layout="vertical" onFinish={handleFinish} form={form}>
                <Form.Item label="Email" name="email" rules={rules}>
                  <Input type="email" />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={rules}>
                  <Input type="password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
              <div>
                <p>
                  Hoặc <Link to="/register"> Đăng ký tài khoản mới!</Link>
                </p>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default Login;
