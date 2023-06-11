import { Button, Col, Form, Input, Modal, notification, Row, Select, Switch, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { getTags } from "../../services/tagService";
import { getCity } from "../../services/cityService";
import { FaDollarSign } from "react-icons/fa";
import getDateTime from "../../helpers/getDateTime"
import { updateJobs } from "../../services/jobsServices";

function EditJob(props) {
  const { record, onReload } = props;
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
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
  
  const handleFinish= async (values)=> {
    const option = {
      ...values,
      updateAt: getDateTime()
    }
    const result =await updateJobs(record.id, option);

    if(result) {
      setIsModalOpen(false);
      onReload()
      api.success({
        message: "Cập nhật thông tin thành công",
        description: <> Bạn đã cập nhật thành công thông tin job <strong>{option.name}</strong></>,
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
  }
  return (
    <>
    {contextHolder}
      <Tooltip placement="bottom" title={"Chỉnh sửa bản ghi"}>
        <Button
          onClick={showModal}
          icon={<EditOutlined style={{ color: "green" }} />}
          type="ghost"
        ></Button>
      </Tooltip>
      <Modal
        title="Chỉnh sửa job"
        open={isModalOpen}
        onCancel={handleCancel}
        width="75vw"
        footer={null}
       

      >
         <Form className="mt20" layout="vertical" onFinish={handleFinish}  initialValues={record} form={form}>
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
            <Button htmlType="submit" type="primary">Cập nhật</Button>
          </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default EditJob;
