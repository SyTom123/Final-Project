import { Button, Table, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getJobs } from "../../services/jobsServices";
import { Link } from "react-router-dom";
import EditJob from "./editJob";
import DeleteJobs from "./delelteJob";
import ViewJobs from "./viewJob";

function JobsManager() {
  const [jobs, setJobs] = useState([]);

  const getApi = async () => {
    const id = getCookie("id");
    const response = await getJobs(id);
    setJobs(response);
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (text, record) =>
        record.tags.map((item, index) => (
          <Tag color="blue" key={index}>
            {item}
          </Tag>
        )),
    },
    {
      title: "Mức lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) =>
        record.status ? (
          <Tag color="green">Đang bật</Tag>
        ) : (
          <Tag color="red">Đang tắt</Tag>
        ),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <>
          <ViewJobs record={record} />
          <DeleteJobs record={record} onReload={handleReload} />
          <EditJob record={record} onReload={handleReload} />
        </>
      ),
    },
  ];
  return (
    <>
      <div className="JobsManager">
        <h2>Danh sách việc làm </h2>
        <Link to="/admin/createJob">
          <Button icon={<PlusOutlined />} className="mt20" type="primary">
            Thêm mới
          </Button>
        </Link>
        <Table
          className="mt20"
          columns={columns}
          dataSource={jobs.reverse()}
          rowKey="id"
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </>
  );
}
export default JobsManager;
