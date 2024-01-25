import axios from "axios";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

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
  const [imagePath, setImagePath] = useState<string>("");

  const submit = async (event: any) => {
    event.preventDefault();
    const result = await postImage(file, "username");
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
        <button type="submit">Submit</button>
      </form>
      <img src={imagePath} alt="" />
    </div>
  );
}

export default CreateUser;
