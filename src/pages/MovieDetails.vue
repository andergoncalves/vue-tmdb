<template>
  <div class="details-container">
    <template v-if="loading">
      <div class="loading">Carregando detalhes...</div>
    </template>

    <template v-else-if="error">
      <div class="error">
        <p>Erro ao carregar os detalhes: {{ error }}</p>
        <button @click="reload">Tentar novamente</button>
      </div>
    </template>

    <template v-else-if="!movie || movie?.id === undefined">
      <div class="not-found">
        <p>Detalhes não encontrados para este filme.</p>
        <button @click="goBack">← Voltar</button>
      </div>
    </template>

    <template v-else>
      <button class="back-btn" @click="goBack">← Voltar</button>

      <div class="content">
        <img
          class="poster"
          :src="posterUrl"
          :alt="movie.title || 'Poster'"
        />

        <div class="info">
          <h1>{{ movie.title || '—' }}</h1>

          <p class="tagline" v-if="movie.tagline">“{{ movie.tagline }}”</p>

          <div class="rating">
            ⭐ {{ movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : '—' }}
            <span class="votes">({{ movie.vote_count ?? 0 }} votos)</span>
          </div>

          <div class="genres" v-if="movie.genres?.length">
            <span v-for="g in movie.genres" :key="g.id">{{ g.name }}</span>
          </div>

          <h3>Sinopse</h3>
          <p class="overview">{{ movie.overview || 'Sem sinopse disponível.' }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const movie = ref(null);
const loading = ref(true);
const error = ref(null);

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const posterUrl = computed(() => {
  const path = movie.value?.poster_path;
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'300'%20height%3D'450'%20xmlns%3D'http://www.w3.org/2000/svg'%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'%23ddd'/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20dominant-baseline%3D'middle'%20text-anchor%3D'middle'%20fill%3D'%23666'%20font-family%3D'Arial'%20font-size%3D'16'%3ESem%20imagem%3C/text%3E%3C/svg%3E";
});

async function fetchMovie() {
  loading.value = true;
  error.value = null;

  if (!API_KEY) {
    error.value = "API key não encontrada. Defina VITE_TMDB_API_KEY no .env (v3 key).";
    loading.value = false;
    return;
  }

  const id = route.params.id;
  if (!id) {
    error.value = "ID do filme não encontrado na rota.";
    loading.value = false;
    return;
  }

  try {
    const resp = await fetch(`${BASE_URL}/movie/${encodeURIComponent(id)}?api_key=${API_KEY}&language=pt-BR`);
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`${resp.status} ${resp.statusText}: ${text}`);
    }

    const data = await resp.json();
    movie.value = data;
  } catch (err) {
    console.error("Erro ao buscar detalhes:", err);
    error.value = err.message || String(err);
  } finally {
    loading.value = false;
  }
}

const goBack = () => router.back();
const reload = () => fetchMovie();

onMounted(fetchMovie);
</script>

<style scoped>
.details-container {
  max-width: 1100px;
  margin: 30px auto;
  padding: 20px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* botao */
.back-btn {
  padding: 8px 14px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 18px;
}
.back-btn:hover { opacity: 0.95; }

/* layout */
.content { display:flex; gap: 24px; align-items:flex-start; }
.poster { width: 320px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.12); }

/* info */
.info { max-width: 680px; }
h1 { margin: 0 0 8px; font-size: 28px; }
.tagline { font-style: italic; color: #666; margin-bottom: 10px; }
.rating { margin: 8px 0; font-weight: 600; }
.genres span { display:inline-block; background:#eee; padding:6px 10px; margin-right:8px; border-radius:10px; font-size:13px; color:#333; }
.overview { line-height:1.6; margin-top:12px; color:#222; }

/* estados */
.loading, .error, .not-found { text-align:center; padding:40px; font-size:18px; color:#333; }
.error p { color: #b91c1c; margin-bottom:12px; }
.error button { background:#ef4444; color:white; padding:8px 12px; border-radius:8px; border:none; cursor:pointer; }
</style>