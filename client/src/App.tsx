import Feed from "./components/Feed";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/api").then((response) =>
      console.log(response)
    );
    // .then((response) => response.json())
    // .then((data) => setbackendData(data));
  }, []);

  return (
    <>
      <Feed />
      <a href={"/user/2"}>Contact Me</a>
    </>
  );
}

export default App;
