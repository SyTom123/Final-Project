import { Button, Tooltip } from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { updateCV } from "../../services/cvService";

function EditCV(props) {
  const { record, onReload } = props;
  const handleClick = async (id) => {
    const options = {
      statusRead: false,
    };
    const result = await updateCV(id, options);
    if (result) {
      onReload();
    }
  };
  return (
    <>
      <Tooltip placement="bottom" title={"Đánh dấu là chưa đọc"}>
        <Button ghost onClick={() => handleClick(record.id)}>
          <EyeInvisibleOutlined style={{ color: "green" }} />
        </Button>
      </Tooltip>
    </>
  );
}
export default EditCV;
