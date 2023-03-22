import axios from "axios";

const url = "http://localhost:8000/api/";

export default {
  toggleFav(link) {
    return axios
      .post(url + "favoris/", link)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        this.msg = error.response.data.msg;
        throw error;
      });
  },
  checkFav(checklink) {
    return axios
      .post(url + "checkFavoritos/", checklink)
      .then((response) => response.data)
      .catch((error) => {
        // Gérer l'erreur ici
        console.log(error.response.data.msg);
        this.msg = error.response.data.msg;
        throw error; // Renvoie l'erreur pour la traiter à l'endroit où elle est appelée
      });
  },
};
