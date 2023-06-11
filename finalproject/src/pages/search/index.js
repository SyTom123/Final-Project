/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link,  useSearchParams } from "react-router-dom";
import GoBack from "../../components/goBack";
import { getCompanyByID } from "../../services/companyService";
import { searchJobs } from "../../services/jobsServices";
import "./search.scss";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("keyword") || "";
  const city = searchParams.get("city") || "";;
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const result = await searchJobs(tag, city);
      const options = [];
      for (let i = 0; i < result.length; i++) {
        if(result[i].status) {
          const idCompany = result[i].idCompany;
          const response = await getCompanyByID(idCompany);
          const option = {
            ...result[i],
            companyName: response[0].companyName,
          };
          options.push(option);
        }
      }
      if (result) {
        setJobData(options);
      }
    };
    getApi();
  }, []);
  return (
    <>
      <div className="search">
        <div className="search__head">
          <h2>
            Kết quả tìm kiếm:
            <span>
              {tag && <Tag color="blue">{tag}</Tag>}
              {(city !== "") && <Tag color="blue">{city}</Tag>}
            </span>
          </h2>
          <GoBack />
        </div>
        {jobData.length > 0 ? (
          <Row gutter={[20, 20]}>
            {jobData.map((item) => (
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24} key={item.id}>
                <Card
                  title={<Link to={`/applyForm/${item.id}`}>{item.name}</Link>}
                >
                  <p>
                    Tên công ty:<strong> {item.companyName}</strong>
                  </p>
                  <p>
                    Ngôn ngữ:
                    <span>
                      {item.tags.length > 0 &&
                        item.tags.map((tag, index) => (
                          <Tag color="blue" key={index}>
                            {tag}
                          </Tag>
                        ))}
                    </span>
                  </p>
                  <p>
                    Thành phố:
                    <span>
                      {item.city &&
                        item.city.map((cityItem, index) => (
                          <Tag color="orange" key={index}>
                            {cityItem}
                          </Tag>
                        ))}
                    </span>
                  </p>
                  <p>
                    Lương:<strong> {item.salary} $</strong>
                  </p>
                  <p>
                    Ngày tạo:<strong> {item.createAt} </strong>
                  </p>
                  <p>
                    Tình trạng:
                    <span>
                      {item.status ? (
                        <Tag color="green">Đang tuyển</Tag>
                      ) : (
                        <Tag color="red">Hết hạn</Tag>
                      )}
                    </span>
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>Không có kết quả để hiển thị</p>
        )}
      </div>
    </>
  );
}
export default Search;
