import { useEffect, useState } from "react";
import { getJobs } from "../../services/jobsServices";
import { getCookie } from "../../helpers/cookie";
import { Row, Col, Card } from "antd";
import './overView.scss'
import { getCVs } from "../../services/cvService";
import { getCompanyByID } from "../../services/companyService";
function OverView() {
  // const [dataJobs, setDataJobs] = useState([]);
  const [jobInfo, setJobInfo] = useState({});
  const [cvInfo, setCvInfo] = useState({});
  const [companyInfo, setcompanyInfo] = useState([]);

  useEffect(() => {
    const id = getCookie("id");
    const getApi = async () => {
      const result = await getJobs(id);
      const response = await getCVs(id);
      const response2 = await getCompanyByID(id);
      if (result) {
        let jobStatusQuantity = 0;
        for (const item of result) {
          if (item.status === true) {
            jobStatusQuantity ++ ;
          }
        }

        const info = {
          "jobStatusQuantity": jobStatusQuantity,
          "jobsQuantity": result.length,
        };
          setJobInfo(info);
      }
      if (response) {
        let cvStatusReadQuantity = 0;
        for (const item of response) {
          if (item.statusRead === true) {
            cvStatusReadQuantity ++ ;
          }
        }

        const cv = {
          "cvStatusReadQuantity": cvStatusReadQuantity,
          "cvQuantity": response.length,
        };
        setCvInfo(cv);
      }
      if (response2) {
        setcompanyInfo(response2);
      }
    };
    getApi();
  }, []);
  return (
    <>
      <div className="overView">
        <div className="overView__container">
          <Row gutter={[20, 20]}>
            <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
              <Card title={"Jobs"}>
                {jobInfo && (
                  <>
                    <p>
                      Số lượng Job: <strong>{jobInfo.jobsQuantity}</strong>
                    </p>
                    <p>
                      Job đang bật: <strong>{jobInfo.jobStatusQuantity}</strong>
                    </p>
                    <p>
                      Job đang tắt: <strong>
                        <>{jobInfo.jobsQuantity - jobInfo.jobStatusQuantity}</>
                      </strong>
                    </p>
                  </>
                )}
              </Card>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
              <Card title={"CV"}>
                {cvInfo && (
                  <>
                    <p>
                      Số lượng CV: <strong>{cvInfo.cvQuantity}</strong>
                    </p>
                    <p>
                      CV chưa đọc:  <><strong> {cvInfo.cvQuantity - cvInfo.cvStatusReadQuantity}</strong></>
                    </p>
                    <p>
                      Cv đã đọc: <strong> {cvInfo.cvStatusReadQuantity}
                      </strong>
                    </p>
                  </>
                )}
              </Card>
            </Col>

            <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
              <Card title={"Thông tin công ty"}>
                {companyInfo.length > 0  && (
                  <>
                    <p>
                      Tên công ty: <strong>{companyInfo[0].companyName}</strong>
                    </p>
                    <p>
                      Email:  <strong> {companyInfo[0].email}</strong>
                    </p>
                    <p>
                      Số điện thoại: <strong> {companyInfo[0].phone}
                      </strong>
                    </p>
                    <p>
                      Số nhân viên:  <strong> {companyInfo[0].quantityPeople}</strong>
                    </p>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default OverView;
