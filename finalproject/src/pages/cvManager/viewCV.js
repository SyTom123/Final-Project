import { Button, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { EyeOutlined} from "@ant-design/icons";
import { updateCV } from "../../services/cvService";

function ViewCV (props) {
    const {record, onReload} = props;
    const handleClick = async (id) => {
        const options = {
          statusRead: true,
        };
        const result = await updateCV(id, options);
        if (result) {
          onReload();
        }
      };
    return (
        <>
         <Tooltip placement="bottom" title={"Xem thông tin chi tiết"}>
            <Link to={`/admin/previewCV/${record.id}`}>
              <Button ghost onClick={() => handleClick(record.id)}>
                <EyeOutlined style={{ color: "#3f87f5" }} />
              </Button>
            </Link>
          </Tooltip>
        </>
    )
}
export default ViewCV