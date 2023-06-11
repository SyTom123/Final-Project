import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getCVs } from "../../services/cvService";
import { getJobs } from "../../services/jobsServices";
import DeleteCV from "./deleteCV";
import EditCV from "./editCV";
import ViewCV from "./viewCV";

function CVManager() {
  const [cvData, setCvData] = useState([]);

  const getApi = async () => {
    const id = getCookie("id");
    const cv = await getCVs(id);
    const job = await getJobs(id);
    let option = [];
    for (let i = 0; i < cv.length; i++) {
      let jobName = "";
      for (const item of job) {
        if (item.id === cv[i].idJob) {
          jobName = item.name;
        }
      }
      option.push({
        ...cv[i],
        jobName,
      });
    }
    setCvData(option);
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleReload = () => {
    getApi();
  };

  const columns = [
    {
      title: "Tên Job",
      dataIndex: "jobName",
      key: "jobName",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          <div style={{ width: "100px" }}>{record.name}</div>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRead",
      render: (text, record) =>
        record.statusRead ? (
          <Tag color="red">Đã đọc</Tag>
        ) : (
          <Tag color="green">Chưa đọc</Tag>
        ),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
          <div style={{ width: "130px" }}>
            <ViewCV record={record} onReload={handleReload} />
            <DeleteCV record={record} onReload={handleReload} />
            <EditCV record={record} onReload={handleReload} />
          </div>
      ),
    },
  ];

  return (
    <>
      <div className="cvMangagr">
        <h2>Danh sách CV</h2>
        <Table
          columns={columns}
          className="mt20"
          dataSource={cvData.reverse()}
          rowKey="id"
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </>
  );
}
export default CVManager;
