import { useEffect, useState } from "react";
import { getTags } from "../../services/tagService";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

function HomeTag () {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        const getApi = async () => {
          const response = await getTags();
          if (response) {
            setTags(response);
          }
        };
        getApi();
      }, []);
      
      const handleClick = (value) => {
        const tag = value;
        navigate(`/search?keyword=${tag || ""}`);
      };
    return (
        <>
         {tags.length > 0 && (
        <div className="home__tags">
          {tags.map((item) => (
            <span
              className="home__tag"
              key={item.key}
              onClick={() => handleClick(item.value)}
            >
              <Tag color="blue"> {item.value} </Tag>
            </span>
          ))}
        </div>
      )}
        </>
    )
}
export default HomeTag;