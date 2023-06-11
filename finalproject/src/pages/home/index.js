import "./home.scss";
import HomeListCompany from "./homeListCompany";
import HomeSearch from "./homeSearch";
import HomeTag from "./homeTag";

function Home() {
  return (
    <>
      <div className="home">
        <HomeSearch />
        <HomeTag/>
        <HomeListCompany/>
      </div>
    </>
  );
}
export default Home;
