<template>
  <div id="Home2">
    <MapList :displayFavorite="displayFavorite"></MapList>
    <Post v-if="admin"></Post>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from "@/components/LogIn.vue";
import Post from "@/components/Post.vue";
import MapList from "@/components/MapList.vue";

export default {
  name: "Home",
  data() {
    return {
      displayFavorite: false,
    };
  },
  components: {
    LogIn,
    Post,
    MapList,
  },
  
};
</script>
<style></style>
