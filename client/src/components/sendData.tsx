import axios from "axios";

async function sendData(data: any, url: string) {
  const formData = new FormData();

  for (let i in data) {
    formData.append(i, data[i]);
  }
  const result = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

export default sendData;
