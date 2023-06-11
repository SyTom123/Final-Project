import { useParams } from "react-router-dom";
import "./applyForm.scss";
import ApplyInfo from "./applyInfo";
import ApplySubmit from "./applySubmit";

function ApplyForm() {
  const param = useParams();

  return (
    <>
      <div className="applyForm">
        <ApplyInfo param={param} />
        <ApplySubmit param={param} />
      </div>
    </>
  );
}
export default ApplyForm;
