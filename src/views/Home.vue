<template>
  <div class="landing-page">
    <div class="hero-section">
      <div class="hero-text">
        <h1>Découvrez les paysages et la culture de la France</h1>
        <p>
          Explorez les plus beaux endroits de France et plongez dans sa riche
          culture. Regardez notre vidéo pour un aperçu de ce que vous pouvez
          voir et faire en France.
        </p>
      </div>
      <div class="video-container">
        <iframe
          width="560"
          height="315"
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

<style></style>
