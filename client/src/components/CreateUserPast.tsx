import axios from "axios";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

async function postImage(image: any, user: string) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("user", user);
  console.log(formData.get("image"));
  const result = await axios.post("/server/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

function CreateUser() {
  const [file, setFile] = useState<any>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");

  const submit = async (event: any) => {
    event.preventDefault();
    const result = await postImage(file, username);
    console.log(result);
    setImagePath(result.imagePath);
  };

  const fileSelected = async (event: any) => {
    const resizeFile = (fileInput: any) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          fileInput,
          70,
          70,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "file"
        );
      });
    const fileResized = await resizeFile(event.target.files[0]);
    setFile(fileResized);
  };

  return (
    <div className="wrapper">
      <div></div>
      <form onSubmit={submit}>
        <div>Profile Image</div>
        <input type="file" onChange={fileSelected} accept="image/*" />
        <div>Username</div>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>Password</div>
        <input
          value={password}
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div></div>
        <button type="submit">Create Account</button>
      </form>
      <img src={imagePath} alt="" />
    </div>
  );
}

export default CreateUser;
