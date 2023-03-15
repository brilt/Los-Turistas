<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="Nombre" type="text" name="nom" placeholder="Nombre" />
    <input
      v-model="Descripción"
      type="text"
      name="Descripción"
      placeholder="Descripción"
    />
    <input v-model="Ciudad" type="text" name="Ciudad" placeholder="Ciudad" />
    <input v-model="Región" type="text" name="Región" placeholder="Región" />
    <input v-model="Enlace" type="text" name="Enlace" placeholder="Enlace" />
    <input
      v-model="Longitud"
      type="number"
      step="any"
      name="Longitud"
      placeholder="Longitud"
    />
    <input
      v-model="Latitud"
      type="number"
      name="Latitud"
      step="any"
      placeholder="Latitud"
    />
    <input v-model="Imagen" type="text" name="Imagen" placeholder="Imagen" />
    <button type="submit">Envoyer</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Nombre: "",
      Descripción: "",
      Ciudad: "",
      Región: "",
      Enlace: "",
      Longitud: null,
      Latitud: null,
      Imagen: "",
    };
  }, //INSERT INTO `los-turistas-db`.`lugares` (`Id`, `Nombre`, `Descripción`, `Ciudad`, `Región`, `Enlace`, `Longitud`, `Latitud`, `Imagen`) VALUES ('2', 'Viaduc de Millau', 'Ceci est la description du viaduc de millau', 'Millau', 'Occitanie', 'https://www.leviaducdemillau.com/en', '3.022881721763473', '44.077623624681536', 'https://upload.wikimedia.org/wikipedia/fr/thumb/a/a6/ViaducdeMillau.jpg/1200px-ViaducdeMillau.jpg');
  methods: {
    handleSubmit() {
      axios
        .post("/api/lugares", {
          Nombre: this.Nombre,
          Descripción: this.Descripción,
          Ciudad: this.Ciudad,
          Región: this.Región,
          Enlace: this.Enlace,
          Longitud: this.Longitud,
          Latitud: this.Latitud,
          Imagen: this.Imagen,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
