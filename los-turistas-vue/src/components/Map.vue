<template>
  <div id="app">
    <div class="container">
      <div class="column">
        <div id="map" style="height: 100%">
          <GMapMap :center="center" :zoom="10" map-type-id="terrain">
            <GMapCluster :zoomOnClick="true">
              <GMapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center = m.position"
              />
            </GMapCluster>
          </GMapMap>
        </div>
      </div>
      <div class="column">
        <h1>Contenu droit</h1>
        <div class="list">
          <article v-for="lugar in lugares" :key="lugar.id" class="card">
            <img :src="lugar.image" />
            <div class="description">
              <h2>{{ lugar.nom }}</h2>
              <p>
                {{ lugar.description }}
              </p>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio"
                >Read all about it</a
              >
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        {
          position: {
            lat: 51.198429,
            lng: 6.69529,
          },
        },
        {
          position: {
            lat: 51.165218,
            lng: 7.067116,
          },
        },
        {
          position: {
            lat: 51.09256,
            lng: 6.84074,
          },
        },
      ],
    };
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
