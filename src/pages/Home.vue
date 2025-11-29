<template>
  <div class="home-container">
    <h1>Filmes Populares</h1>

    <div v-if="loading">Carregando filmes...</div>

    <div class="grid">
      <MovieCard
        v-for="m in movies"
        :key="m.id"
        :movie="m"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieCard from "../components/MovieCard.vue";
import { getPopularMovies } from "../api/tmdb";

const movies = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  movies.value = await getPopularMovies();
  loading.value = false;
});
</script>

<style scoped>
.home-container {
  padding: 30px;
  min-height: 100vh;
  background: #0f172a;
  color: white;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
