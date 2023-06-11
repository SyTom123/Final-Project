import { Button, Col, Form, Input, notification, Row, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { getTags } from "../../services/tagService";
import { FaDollarSign } from "react-icons/fa";
import { getCity } from "../../services/cityService";
import TextArea from "antd/es/input/TextArea";
import GoBack from "../../components/goBack"
import getDateTime from "../../helpers/getDateTime";
import { createJobs } from "../../services/jobsServices";
import { getCookie } from "../../helpers/cookie";

function CreateJob() {
  const [api, contextHolder] = notification.useNotification();
  const [form]= Form.useForm();
  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];
  const [tagsOptions, setTagsOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(()=> {
    const getApi = async () => {
        const result = await getTags();
        const response = await getCity();
        if(result) {
          setTagsOptions(result);
        }
        if(response) {
          setCityOptions(response);
        }
    }
    getApi()
  },[])

  const handleFinish = async (values)=> {
    const jobInfo = {
      ...values,
      createAt: getDateTime(),
      idCompany: getCookie("id")
    };
    const result = await createJobs(jobInfo);

    if(result) {
      form.resetFields();
      api.success({
        message: "Tạo việc mới thành công",
        description: <> Bạn đã tạo mới thành công job <strong>{jobInfo.name}</strong></>,
        placement: "bottomRight",
        duration: 3
    })
    }
    else {
      api.error({
          message: "Cập nhật thông tin không thành công",
          description: "Hệ thống đang lỗi. Xin vui lòng thử lại",
          placement: "bottomRight",
          duration: 3
      });
  }
  }
  return (
    <>
      {contextHolder}
      <div className="createJob">
        <div className="creatJob__head" 
        style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <h2>Tạo job mới</h2>
          <GoBack/>
        </div>
        <Form className="mt20" layout="vertical" onFinish={handleFinish}  form={form}>
          <Row gutter={[20]}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item label="Tên job" name="name" rules={rules}>
                <Input />
              </Form.Item>
            </Col>

            <Col xxl={16} xl={16} lg={16} md={16} sm={24} sx={24}>
              <Form.Item label="Tags" name="tags" rules={rules} >
                <Select options={tagsOptions} mode={"multiple"}/>
              </Form.Item>
            </Col>

            <Col xxl={8} xl={8} lg={8} md={8} sm={24} sx={24}>
              <Form.Item label="Mức lương" name="salary" rules={rules}>
                <Input  addonAfter={<FaDollarSign/>} />
              </Form.Item>
            </Col>

            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item label="Thành phố" name="city" rules={rules}>
                <Select options={cityOptions} mode={"multiple"}/>
              </Form.Item>
            </Col>

            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item label="Mô tả" name="description" >
                <TextArea rows={10} showCount/>
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>
           
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
            <Button htmlType="submit" type="primary">Thêm mới</Button>
          </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
export default CreateJob;
