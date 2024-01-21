import axios from "axios";
import { useState } from "react";

async function postImage(image: any, user: string) {
  console.log(image);
  const formData = new FormData();
  formData.append("image", image);
  formData.append("user", user);
  const result = await axios.post("/server/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

function CreateUser() {
  const [file, setFile] = useState<any>();
  const [username, setUsername] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");

  const submit = async (event: any) => {
    event.preventDefault();
    const result = await postImage(file, username);
    console.log(result);
    setImagePath(result.imagePath);
  };

  const fileSelected = (event: any) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input type="file" onChange={fileSelected} accept="image/*" />
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <img src={imagePath} alt="" />
    </div>
  );
}

export default CreateUser;
