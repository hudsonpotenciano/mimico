import firebase from "./mongodb.service";

const getAnimais = async () => {
  // const key = "animais";
  // const animais = await firebase.get(key);
  // return JSON.parse(animais.data);
  return ["Cat", "Dog", "Mouse"];
};

export { getAnimais };
