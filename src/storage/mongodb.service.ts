import axios from "axios";
const baseUrl = "https://mimico-firebase-default-rtdb.firebaseio.com/";

const set = async (key: string, value: any) => {
  return axios.post(baseUrl + key, value);
};

const get = async (key: string) => {
  return await axios.get(baseUrl + key + ".json");
};

export default { set, get };
