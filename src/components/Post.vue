<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="Name" type="text" name="name" placeholder="Name" />
    <input
      v-model="Description"
      type="text"
      name="Description"
      placeholder="Description"
    />
    <input v-model="City" type="text" name="City" placeholder="City" />
    <input v-model="Region" type="text" name="Region" placeholder="Region" />
    <input v-model="Link" type="text" name="Link" placeholder="Link" />
    <input
      v-model="Longitud"
      type="number"
      step="any"
      name="Longitud"
      placeholder="Longitud"
    />
    <input
      v-model="Latitude"
      type="number"
      name="Latitude"
      step="any"
      placeholder="Latitude"
    />
    <input v-model="Image" type="text" name="Image" placeholder="Image" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Name: "",
      Description: "",
      City: "",
      Region: "",
      Link: "",
      Longitud: null,
      Latitude: null,
      Image: "",
    };
  }, //INSERT INTO `los-turistas-db`.`lugares` (`Id`, `Name`, `Description`, `City`, `Region`, `Link`, `Longitud`, `Latitude`, `Image`) VALUES ('2', 'Viaduc de Millau', 'Ceci est la description du viaduc de millau', 'Millau', 'Occitanie', 'https://www.leviaducdemillau.com/en', '3.022881721763473', '44.077623624681536', 'https://upload.wikimedia.org/wikipedia/fr/thumb/a/a6/ViaducdeMillau.jpg/1200px-ViaducdeMillau.jpg');
  methods: {
    handleSubmit() {
      axios
        .post("https://los-turistas-ws.onrender.com/api/Places", {
          Name: this.Name,
          Description: this.Description,
          City: this.City,
          Region: this.Region,
          Link: this.Link,
          Longitud: this.Longitud,
          Latitude: this.Latitude,
          Image: this.Image,
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
