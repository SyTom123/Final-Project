/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Form, Input, Row, Select, notification} from "antd";
import TextArea from "antd/es/input/TextArea";
import { createCV } from "../../services/cvService";
import getDateTime from "../../helpers/getDateTime";
import { useEffect, useState } from "react";
import { getJobByID } from "../../services/jobsServices";
import { getCompanyByID } from "../../services/companyService";

function ApplySubmit(props) {
  const { param } = props;
  const rules = [{ required: true, message: "Bắt buộc" }];
  const [companyData, setCompanyData] = useState([]);
  const [optionsSelection, setOptionsSelection] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  useEffect(() => {
    const getApi = async () => {
      const response = await getJobByID(param.id);
      const result = await getCompanyByID(response[0].idCompany);
  
      if (result) {
        setCompanyData(result);
      }
      const option = response[0].city;

      if (option) {
        const selectionOption = option.map((item, index) => {
          return {
            lable: item,
            value: item,
          };
        });
        setOptionsSelection(selectionOption);
      }
    };
    getApi();
  }, []);

  const handleFinish = async (value) => {
    const options = {
      ...value,
      idCompany: companyData[0].id,
      idJob: parseInt(param.id),
      statusRead: false,
      createAt: getDateTime(),
    };
    console.log(options);
    const result = await createCV(options);
    if (result) {
      form.resetFields();
      api.success({
        message: "Ứng tuyển thành công",
        description:
          "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất",
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      api.error({
        message: "Ứng tuyển không thành công",
        description: "Hệ thống đang lỗi. Xin vui lòng thử lại",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Card title="Ứng tuyển ngay" className="mt20">
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Row gutter={[20]}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} sx={24}>
              <Form.Item label="Họ và tên" name="name" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} sx={24}>
              <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} sx={24}>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input type={"email"} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} sx={24}>
              <Form.Item label="Thành phố" name="city" rules={rules}>
                <Select
                  placeholder="Chọn thành phố"
                  options={optionsSelection}
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item
                label="Giới thiệu bản thân"
                name="description"
                rules={rules}
              >
                <TextArea rows={4} showCount />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item
                label="Link project đã làm"
                name="linkProject"
                rules={rules}
              >
                <TextArea rows={6} showCount />
              </Form.Item>
            </Col>
            <Button type="primary" htmlType="submit">
              Gửi yêu cầu
            </Button>
          </Row>
        </Form>
      </Card>
    </>
  );
}
export default ApplySubmit;
