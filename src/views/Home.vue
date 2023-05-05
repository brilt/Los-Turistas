<template>
  <div id="Home">
    <MapList :displayFavorite="displayFavorite"></MapList>
    
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
