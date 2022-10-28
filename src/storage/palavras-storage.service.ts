import firebase from "./firebase.service";

const getAnimais = async () => {
  const key = "animais";
  const animais = await firebase.get(key);
  return JSON.parse(animais.data);
};

export { getAnimais };
