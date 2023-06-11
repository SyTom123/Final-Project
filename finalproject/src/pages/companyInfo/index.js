import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getCompanyByID, updateCompany } from "../../services/companyService";

function CompanyInfo() {
  const [api, contextHolder] = notification.useNotification();
  const [form]= Form.useForm();
  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];
  const [companyInfo, setcompanyInfo] = useState([]);
  const [formDisabled, setFormDisabled] = useState(true);

  const getApi = async () => {
    const id = getCookie("id");
    const response = await getCompanyByID(id);
    setcompanyInfo(response);
  };
  
  useEffect(() => {
    getApi();
  }, []);

  const handleReload = ()=> {
    getApi();
  }

  const handleClick = () => {
    handleReload();
    form.resetFields();
    setFormDisabled(!formDisabled);
  };

  const handleFinish = async (values) => {
    const id = getCookie("id");
    const result = await updateCompany(id, values);
    if (result) {
        setFormDisabled(!formDisabled);
        handleReload();
        api.success({
            message: "Cập nhật thông tin thành công",
            description: <> Bạn đã cập nhật thành công thông tin công ty <strong>{values.companyName}</strong></>,
            placement: "bottomRight",
            duration: 3
        });
    }
    else {
        api.error({
            message: "Cập nhật thông tin không thành công",
            description: "Hệ thống đang lỗi. Xin vui lòng thử lại",
            placement: "bottomRight",
            duration: 3
        });
    }
  };
  return (
    <>
        {contextHolder}
      <div className="companyInfo">
        <div className="companyInfo__container">
          <Card
            title={"Thông tin công ty"}
            extra={
              formDisabled ? (
                <Button
                  onClick={() => {
                    setFormDisabled(!formDisabled);
                  }}
                >
                  Chỉnh sửa
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setFormDisabled(!formDisabled);
                  }}
                >
                  Hủy
                </Button>
              )
            }
          >
            {companyInfo.length > 0 && (
              <Form
                layout="vertical"
                initialValues={companyInfo[0]}
                disabled={formDisabled}
                onFinish={handleFinish}
                form={form}
              >
                <Row gutter={[20, 20]}>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                    <Form.Item
                      label="Tên công ty"
                      name="companyName"
                      rules={rules}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
                    <Form.Item label="Email" name="email" rules={rules}>
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
                    <Form.Item label="Số điện thoại" name="phone">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
                    <Form.Item label="Địa chỉ" name="address">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
                    <Form.Item label="Số lượng nhân sự" name="quantityPeople">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
                    <Form.Item label="Thời gian làm việc " name="workingTime">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
                    <Form.Item label="Websize" name="website">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                    <Form.Item label="Mô tả ngắn" name="description">
                      <TextArea rows="4" showCount />
                    </Form.Item>
                  </Col>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                    <Form.Item label="Mô tả chi tiết" name="detail">
                      <TextArea rows="8" showCount />
                    </Form.Item>
                  </Col>
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ marginRight: "15px" }}
                  >
                    Cập nhật
                  </Button>
                  <Button type="primary" danger onClick={handleClick}>
                    Hủy
                  </Button>
                </Row>
              </Form>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
export default CompanyInfo;
