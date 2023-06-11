import { Button, Popconfirm, Tooltip, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteJobs } from "../../services/jobsServices";
function DeleteJobs(props) {
  const { onReload, record } = props;
  const [api, contextHolder] = notification.useNotification();

  const handleDelete = async (id, record) => {
    const response = await deleteJobs(id);
    if (response) {
      onReload();
      api.success({
        message: "Xóa thông tin thành công",
        description: (
          <>
            Bạn đã xóa thành công thông tin job <strong>{record.name}</strong>
          </>
        ),
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      api.error({
        message: "Cập nhật thông tin không thành công",
        description: "Hệ thống đang lỗi. Xin vui lòng thử lại",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => handleDelete(record.id, record)}
      >
        <Tooltip placement="bottom" title={"Xoá bản ghi"}>
          <Button
            icon={<DeleteOutlined style={{ color: "red" }} />}
            ghost
          ></Button>
        </Tooltip>
      </Popconfirm>
    </>
  );
}
export default DeleteJobs;
