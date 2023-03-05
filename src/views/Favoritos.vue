<script setup>
import {ref} from 'vue'

const center = ref({ lat: 51.093048, lng: 6.84212})
const markers = ref([
  { position: { lat: 51.093048, lng: 6.84212 }}
])
</script>

<template>
<div style="width: 500px; height: 300px">
<GMapMap :center="center" :zoom="7" style="height: 100%; overflow: visible;"/>
</div>
  
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>