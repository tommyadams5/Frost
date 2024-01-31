import FeedAdmin from "./components/FeedAdmin";
import "./AppAdmin.css";

function AppAdmin() {
  return (
    <div className="wrapper">
      <div className="col_1"></div>
      <div className="col_2">
        <FeedAdmin />
      </div>
      <div className="col_3"></div>
    </div>
  );
}

export default AppAdmin;
