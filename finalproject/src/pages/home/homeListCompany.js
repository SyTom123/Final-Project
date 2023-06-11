import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompany } from "../../services/companyService";

function HomeListCompany() {
  const [companyData, setCompanyData] = useState([]);
  const getApi = async () => {
    const response = await getCompany();
    if (response) {
      setCompanyData(response);
    }
  };
  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="homeListCompany">
      <h2> Danh sách một số công ty </h2>
      {companyData.length > 0 && (
        <div className="home__companies">
          <Row gutter={[20, 20]}>
            {companyData.slice(0, 2).map((item) => (
              <Col xxl={8} xl={8} lg={8} md={12} sm={12} sx={24} key={item.id}>
                <Card>
                  <div className="home__company">
                    <p>
                      Công ty:
                      <Link to={`/companyDetail/${item.id}`}>
                        <strong> {item.companyName} </strong>
                      </Link>
                    </p>
                    <p>
                      Số nhân sự:
                      <strong>
                        {item.quantityPeople
                          ? item.quantityPeople
                          : "Chưa cập nhật"}
                      </strong>
                    </p>
                    <p>
                      Địa chỉ:
                      <strong>
                        {item.address ? item.address : "Chưa cập nhật"}
                      </strong>
                    </p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Link to="/companyList">
        <Button className="mt20" type="primary" ghost>
          Xem thêm
        </Button>
      </Link>
    </div>
  );
}
export default HomeListCompany;
