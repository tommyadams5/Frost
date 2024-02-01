import axios from "axios";
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

function ProfileImage(props: any) {
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
    console.log(fileResized, props.username);
    const result = await postImage(fileResized, props.username);
    console.log(result);
  };

  return (
    <div className="wrapper">
      <img
        src={"http://localhost:8000/server/images/" + props.username}
        className="postbox_avatar"
        onClick={() => document.getElementById("fileInput")?.click()}
      />
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={fileSelected}
      />
    </div>
  );
}

export default ProfileImage;
