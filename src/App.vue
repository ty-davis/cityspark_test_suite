<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="content">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/" class="navlink">
            <span class="title">
              CitySpark Test Suite
            </span>
          </RouterLink>
          <RouterLink to="/my-event-calendar" class="navlink navlink-small">Portal</RouterLink>
          <RouterLink to="/widget" class="navlink navlink-small">Widget</RouterLink>
          <RouterLink to="/collection" class="navlink navlink-small">Collection</RouterLink>
        </nav>
      </div>
    </header>

  <RouterView />
  </div>
</template>

<style scoped>
.navlink {
  text-decoration: none;
  color: black;
  padding: 10px;
}
.navlink-small {
  border-left: 1px solid;
  padding: 3px 10px;
}
.navlink-small:hover {
  background-color: #eee;
  transition: all 0.5s;
}
.title {
  font-size: xx-large;
  font-weight: 550;
}
nav {
  display: flex;
  align-items: center;
}
</style>
