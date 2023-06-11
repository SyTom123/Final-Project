/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../services/jobsServices";

function DetailJobs({ params }) {
  const [objData, setObjData] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const result = await getJobs(params.id);
      if (result) {
        const options = result.filter((item)=> (
          item.status === true
        ))
        setObjData(options);
      }
    };
    getApi();
  }, []);
  return (
    <div className="companyDetail__jobs">
      {objData.length > 0 ? (
        <Row gutter={[20, 20]}>
          {objData.map((item) => (
            <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24} key={item.id}>
              <Card
                title={<Link to={`/applyForm/${item.id}`}>{item.name}</Link>}
              >
                <p> Ngôn ngữ:
                  <span>
                    {item.tags.length > 0 &&
                      item.tags.map((tag, index) => (
                        <Tag color="blue" key={index}>
                          {tag}
                        </Tag>
                      ))}
                  </span>
                </p>
                <p> Thành phố:
                  <span>
                    {item.city &&
                      item.city.map((cityItem, index) => (
                        <Tag color="orange" key={index}>
                          {cityItem}
                        </Tag>
                      ))}
                  </span>
                </p>
                <p> Lương:<strong> {item.salary} $</strong></p>
                <p> Ngày tạo:<strong> {item.createAt} </strong> </p>
                <p> Tình trạng:
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
        <p> <strong>Không có job để hiển thị</strong> </p>
      )}
    </div>
  );
}
export default DetailJobs;
