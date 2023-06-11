import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getCompany } from "../../services/companyService";
import GoBack from '../../components/goBack'
import { Link } from "react-router-dom";

function CompanyList() {
    const [companyData, setCompanyData] = useState([]);
   
      useEffect(() => {
        const getApi = async () => {
            const response = await getCompany();
            if (response) {
              setCompanyData(response);
            }
          };
          getApi()
      }, []);
  return (
    <>
     <div className="companyList">
        <div className="companyList__head" 
        style={{display:"flex", alignItems: "center", justifyContent: "space-between"}} >
            <h2>Danh sách công ty</h2>
            <GoBack/>
        </div>
        
        {companyData.length > 0 && (
          <div className="home__companies">
            <Row gutter={[20, 20]}>
              {companyData.map((item) => (
                <Col xxl={8} xl={8} lg={8} md={12 }sm={12} sx={24}
                  key={item.id}
                >
                  <Card>
                    <div className="home__company">
                      <p>
                        Công ty:
                        <Link to ={`/companyDetail/${item.id}`}>
                            <strong> {item.companyName} </strong>
                        </Link>
                      </p>
                      <p>
                        Số nhân sự:
                        <strong> { item.quantityPeople ? item.quantityPeople: "Chưa cập nhật"} </strong>
                      </p>
                      <p>
                        Địa chỉ:
                        <strong> { item.address ? item.address : "Chưa cập nhật"} </strong>
                      </p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
     </div>
    </>
  );
}
export default CompanyList;
