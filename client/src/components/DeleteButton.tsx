import axios from "axios";

function DeleteButton({ pullData }: any) {
  async function clear() {
    const query = await axios.get("/server/delete");
    console.log(query);
    pullData();
  }

  return (
    <button onClick={clear} type="submit" className="feedClearButton">
      Clear Feed
    </button>
  );
}

export default DeleteButton;
