import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function GoBack () {
    const navigate = useNavigate();
    const handleClick = ()=> {
        navigate(-1);
    }
    return (
        <>
            <Button type="primary" danger onClick={handleClick}>Trở lại</Button>
        </>
    )
}
export default GoBack;