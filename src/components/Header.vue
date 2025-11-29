<template>
  <header class="header">
    <h2 @click="$router.push('/')">🎬 Vue TMDB</h2>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 15px 30px;
  background: #1e293b;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
</style>
