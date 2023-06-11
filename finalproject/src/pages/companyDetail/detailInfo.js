/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import GoBack from "../../components/goBack";
import { getCompanyByID } from "../../services/companyService";

function DetailInfo(props) {
  const { params } = props;
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const response = await getCompanyByID(params.id);
      if (response) {
        setCompanyData(response);
      }
    };
    getApi();
  }, []);

  return (
    <>
      <div className="companyDetail__head">
        <h2>Thông tin chi tiết</h2>
        <GoBack />
      </div>
      <div className="companyDetail__info">
        {companyData.length > 0 && (
          <>
            <h2 >{companyData[0].companyName}</h2>
              Số lượng nhân sự:<strong> {companyData[0].quantityPeople}</strong> <br />
            <p>
              Thời gian làm việc:<strong> {companyData[0].workingTime}</strong>
            </p>
            <p>
              Websize:<strong> {companyData[0].website}</strong>
            </p>
            <p>
              Mô tả ngắn: <br /> {companyData[0].description}
            </p>
            <p>
              Mô tả chi tiết: <br /> {companyData[0].detail}
            </p>
            <p>
              Danh sách các job: <br />
            </p>
          </>
        )}
      </div>
    </>
  );
}
export default DetailInfo;
