<template>
  <div class="landing-page">
    <div class="hero-section">
      <div class="hero-text">
        <h1>Discover the landscapes and culture of France</h1>
      </div>
      <div class="video-container">
        <iframe
        class="responsive-iframe"
          src="https://www.youtube.com/embed/j9q3NLqUvxI?autoplay=1&mute=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style>
.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 -30%;
  width: 60%;
  height: 60%;
}
</style>
