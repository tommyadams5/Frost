import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import db from "../firebase.tsx";

function DeleteButton({ pullData }: any) {
  async function clear() {
    const query = await getDocs(collection(db, "posts"));
    query.forEach((entry) => {
      deleteDoc(doc(db, "posts", entry.id));
    });
    pullData();
  }

  return (
    <button onClick={clear} type="submit" className="feedClearButton">
      Clear Feed
    </button>
  );
}

export default DeleteButton;
