import { Button, Col, Form, Input, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCity } from "../../services/cityService";
import { useNavigate } from "react-router-dom";

function HomeSearch() {
  const rules = [{ required: true, message: "Bắt buộc" }];
  const [optionsSelection, setOptionsSelection] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getApi = async () => {
      const result = await getCity();
      if (result) {
        result.unshift({
          key: 0,
          value: "All",
        });
        setOptionsSelection(result);
      }
    };
    getApi();
  }, []);
  const handleFinish = async (values) => {
    const tag = values.tag;
    var city = values.city;
    if (city === undefined || city === "All") {
      city = " ";
    }
    // navigate(`search/${city}/${tag}`);
    navigate( `/search?city=${city}&keyword=${tag || ""}`);
  
  };

  return (
    <div className="homeSearch">
      <h1> 1000 + IT Jobs for Developers </h1>
      <Form onFinish={handleFinish}>
        <Row gutter={[20]}>
          <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
            <Form.Item name="city">
              <Select placeholder="Chọn thành phố" options={optionsSelection} />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
            <Form.Item name="tag" rules={rules}>
              <Input placeholder="Nhập từ khóa..." />
            </Form.Item>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4} sm={4} sx={24}>
            <Form.Item>
              <Button
                icon={<SearchOutlined />}
                type="primary"
                htmlType="submit"
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default HomeSearch;
