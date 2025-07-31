<template>
  <h2>Settings</h2>
  <label>Textured background</label>
  <input type="checkbox" v-model="texturedBackground"></input>
</template>

<script setup>
  import { texturedBackground } from '@/store';
</script>
