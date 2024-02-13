import Feed from "../../components/Feed";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <div className="col_1"></div>
      <div className="col_2">
        <Feed />
      </div>
      <div className="col_3"></div>
    </div>
  );
}

export default App;
