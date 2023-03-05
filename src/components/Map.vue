<script>
export default {
  name: "App",
  data() {
    return {
      center: { lat: 51.093048, lng: 6.84212 },
      markers: [
          {
            position: {
              lat: 51.093048,
              lng: 6.84212,
            },
          },
        ],
    };
  },
};
</script>

<template>
  <GMapMap :center="center" :zoom="7" style="width: 500px; height: 300px">
    <GMapMarker :key="marker.id" v-for="marker in markers" :position="marker.position" />
   </GMapMap>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>