import { Button, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { EyeOutlined } from "@ant-design/icons";
function ViewJobs (props) {
    const {record} = props;
    return (
        <>
        <Tooltip placement="bottom" title={"Xem thông tin chi tiết"}>
            <Link to={`/admin/previewObj/${record.id}`}>
              <Button type="ghost">
                <EyeOutlined style={{ color: "#3f87f5" }} />
              </Button>
            </Link>
          </Tooltip>
        </>
    )
}
export default ViewJobs