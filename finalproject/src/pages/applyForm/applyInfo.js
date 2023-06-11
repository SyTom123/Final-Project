/* eslint-disable react-hooks/exhaustive-deps */
import { Tag } from "antd";
import GoBack from "../../components/goBack";
import { useEffect, useState } from "react";
import { getJobByID } from "../../services/jobsServices";
import { getCompanyByID } from "../../services/companyService";

function ApplyInfo(props) {
  const { param } = props;

  const [jobs, setJobs] = useState([]);
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const response = await getJobByID(param.id);
      const result = await getCompanyByID(response[0].idCompany);
      if (response) {
        setJobs(response);
      }
      if (result) {
        setCompanyData(result);
      }
    };
    getApi();
  }, []);
  
  return (
    <>
      <div className="applyForm__head">
        <h2>Thông tin ứng tuyển</h2>
        <GoBack />
      </div>
      <div className="applyForm__body">
        {jobs.length > 0 && (
          <>
            <h1>{jobs[0].name}</h1>
            <p>
              Ngôn ngữ:
              <span>
                {jobs[0].tags.length > 0 &&
                  jobs[0].tags.map((tag, index) => (
                    <Tag color="blue" key={index}>
                      {tag}
                    </Tag>
                  ))}
              </span>
            </p>
            <p>
              Thành phố:
              <span>
                {jobs[0].city &&
                  jobs[0].city.map((cityItem, index) => (
                    <Tag color="orange" key={index}>
                      {cityItem}
                    </Tag>
                  ))}
              </span>
            </p>
            <p>
              Lương:<strong> {jobs[0].salary} $</strong>
            </p>
            <p>
              Ngày tạo:<strong> {jobs[0].createAt} </strong>
            </p>
            <p>
              Tình trạng:
              <strong>
                {jobs[0].status ? (
                  <Tag color="green">Đang tuyển</Tag>
                ) : (
                  <Tag color="red">Hết hạn</Tag>
                )}
              </strong>
            </p>
            <p>
              Mô tả công việc: <br />
              {jobs[0].description}
            </p>
            {companyData.length > 0 && (
              <>
                <p>
                  Tên công ty: <strong> {companyData[0].companyName}</strong>
                </p>
                <p>
                  Địa chỉ: <strong> {companyData[0].address}</strong>
                </p>
                <p>
                  Websize: <strong> {companyData[0].website}</strong>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
export default ApplyInfo;
