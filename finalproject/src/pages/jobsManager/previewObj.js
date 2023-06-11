/* eslint-disable react-hooks/exhaustive-deps */
import { Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoBack from "../../components/goBack"
import { getJobByID } from "../../services/jobsServices";
function PreviewObj() {
  const param = useParams();
  const [objData, setJobData] = useState([]);

  useEffect(()=> {
    const getApi = async ()=> {
      const result = await getJobByID(param.id);
      if(result) {
        setJobData(result)
      }
    }
    getApi()
  },[])
  
  return (
    <>
      <div className="previewObj">
        <div className="previewObj__head" 
        style={{display: "flex", alignContent: "center", justifyContent: "space-between"}} >
          <h2>Thông tin chi tiết</h2>
          <GoBack/>
        </div>
        {(objData.length > 0) && (
          <div className="previewObj__body ">
          <p>Tên job: <strong>{objData[0].name }</strong></p>
          <p>Trạng thái: {objData[0].status? <Tag color={"green"}>Đang bật</Tag> :
          <Tag color={"red"}>Đang tắt</Tag> }</p>
          <p>Tags: { objData[0].tags.map((item, index)=> (
                <Tag color={"blue"} key={index}>{item}</Tag>
              ))}
          </p>
          <p>Mức lương: <strong> {objData[0].salary} $</strong></p>
          <p>Ngày tạo: <strong> {objData[0].createAt}</strong></p>
          <p>Cập nhật: <strong> { objData[0].updateAt ? (objData[0].updateAt):("Chưa cập nhật")}</strong></p>
          <p>Thành phố: { objData[0].city.map((item, index)=> (
                <Tag color={"orange"} key={index}>{item}</Tag>
              ))}
          </p>
          <p>Mô tả:<br/> {objData[0].description}</p>
        </div> 
        )}
      </div>
    </>
  );
}
export default PreviewObj;
