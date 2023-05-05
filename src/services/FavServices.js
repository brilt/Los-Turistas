import axios from "axios";

const url = "https://los-turistas-ws.onrender.com/api/";

export default {
  toggleFav(link) {
    return axios
      .post(url + "favorites/", link)
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
      .post(url + "checkFavorites/", checklink)
      .then((response) => response.data)
      .catch((error) => {
        // Gérer l'erreur ici
        console.log("ERROR FAVSERVICES: "+error.response.data.msg);
        this.msg = error.response.data.msg;
        throw error; // Renvoie l'erreur pour la traiter à l'endroit où elle est appelée
      });
  },
};
