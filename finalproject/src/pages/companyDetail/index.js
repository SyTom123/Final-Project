/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import "./companyDetail.scss";
import DetailInfo from "./detailInfo";
import DetailJobs from "./detailJobs";

function CompanyDetail() {
  const params = useParams();
  return (
    <div className="companyDetail">
      <DetailInfo params={params} />
      <DetailJobs params={params} />
    </div>
  );
}
export default CompanyDetail;
