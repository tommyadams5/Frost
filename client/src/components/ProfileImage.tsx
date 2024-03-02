import axios from "axios";
import Resizer from "react-image-file-resizer";

// Function sends profile image to server
async function postImage(image: any, user: string) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("user", user);
  const result = await axios.post("/server/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return result.data;
}

// Function reduces the size of the profile image and then sends it to the server
function ProfileImage({ username }: any) {
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
    await postImage(fileResized, username);
    window.location.href = "/";
  };

  return (
    <div>
      {username && (
        <img
          src={"/server/images/" + username}
          className="postbox_profileImg"
          onClick={() => document.getElementById("fileInput")?.click()}
        />
      )}
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
