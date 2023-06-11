/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoBack from "../../components/goBack";
import { getCVByID } from "../../services/cvService";
import { getJobByID } from "../../services/jobsServices";

function PreviewCV() {
  const param = useParams();
  const [cvData, setCvData] = useState([]);
  const [jobData, setJobCvData] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const result = await getCVByID(param.id);
      const response = await getJobByID(result[0].idJob);
      if (result) {
        setCvData(result);
      }
      if (response) {
        setJobCvData(response);
      }
    };
    getApi();
  }, []);

  return (
    <>
      <div className="previewCV">
        <div
          className="previewCV__head"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ marginTop: "0" }}>Thông tin chi tiết</h2>
          <GoBack />
        </div>
        {cvData.length > 0 && (
          <Card title={`Ứng viên: ${cvData[0].name}`}>
            <p>
              Ngày gửi: <strong>{cvData[0].createAt}</strong>
            </p>
            <p>
              Số điện thoại: <strong>{cvData[0].phone}</strong>
            </p>
            <p>
              Email: <strong>{cvData[0].email}</strong>
            </p>
            <p>
              Thành phố ứng tuyển: <strong>{cvData[0].city}</strong>
            </p>
            <p>Giới thiệu bản thân: <br/>
              {cvData[0].description}</p>
            <p>Link Project:<br/> {cvData[0].linkProject}</p>
          </Card>
        )}
        {jobData.length > 0 && (
          <Card title={`Thông tin job: ${jobData[0].name}`} className="mt20">
            <p>
              Tag: {jobData[0].tags.map((item,index) => (
                <Tag color="blue" key = {index}>{item}</Tag>
              ))}
            </p>
            <p>
              Mức lương: <strong>{jobData[0].salary}$</strong>
            </p>
            <p>
              Mô tả: <br/>
              {jobData[0].description}
            </p>
          </Card>
        )}
      </div>
    </>
  );
}
export default PreviewCV;
