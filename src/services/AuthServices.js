import axios from "axios";

const url = "https://los-turistas-ws.onrender.com/api/";

export default {
  login(credentials) {
    return axios
      .post(url + "login/", credentials)
      .then((response) => response.data)
      .catch((error) => {
        // Gérer l'erreur ici
        console.log(error);
        this.msg = error.response.data.msg;
        throw error; // Renvoie l'erreur pour la traiter à l'endroit où elle est appelée
      });
  },
  signUp(credentials) {
    return axios
      .post(url + "sign-up/", credentials)
      .then((response) => response.data)
      .catch((error) => {
        // Gérer l'erreur ici
        console.log(error);
        throw error; // Renvoie l'erreur pour la traiter à l'endroit où elle est appelée
      });
  },
};
