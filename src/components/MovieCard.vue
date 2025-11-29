<template>
  <router-link
    :to="`/movie/${movie.id}`"
    class="movie-card"
  >
    <img
      :src="posterUrl"
      :alt="movie.title"
      class="poster"
    />

    <div class="info">
      <h3>{{ movie.title }}</h3>
      <p class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</p>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

// Monta a URL do poster (tamanho médio)
const posterUrl = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;
</script>

<style scoped>
.movie-card {
  display: block;
  width: 200px;
  border-radius: 10px;
  overflow: hidden;
  background: #111;
  color: white;
  text-decoration: none;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.info {
  padding: 10px;
}

h3 {
  margin: 0;
  font-size: 1rem;
}

.rating {
  margin-top: 5px;
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
