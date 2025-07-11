<template>
  <h2>Widget Example</h2>
  <div class="wid-id-form">
    <label for="widID">Widget ID</label>
    <input id="widID" v-model="widgetID"/>
    <button>Reload Widget</button>
  </div>
  <hr/>
  <div id="content-wrapper" style="display: flex; justify-content: center;">
      <div :data-cswidget="widgetID"> </div>
  </div>
</template>

<style scoped>
.wid-id-form {
  display: flex;
  gap: 10px;
}
</style>

<script setup>
import { ref } from 'vue';

const widgetID = ref("7065");

</script>

<script>
export default {
  name: 'Widget',
  data() {
    return {
      scriptElement: null
    }
  },
  mounted() {
    const useBeta = true;
    window.cswidgetoverR = {
      portal: "//portalbeta.cityspark.com/",
      wportal: useBeta ? "https://pbeta.cityspark.com/" : "https://localhost:44133/"
    };

    const script = document.createElement('script');
    script.src = "//cdn.cityspark.com/wid/get.js"
    script.async = true;
    script.defer = true;
    
    // Store reference to the script element
    this.scriptElement = script;
    
    const wrap = document.getElementById("content-wrapper");
    wrap.appendChild(script);
  },
  beforeUnmount() {
    // Clean up the script when component is unmounted
    if (this.scriptElement && this.scriptElement.parentNode) {
      this.scriptElement.parentNode.removeChild(this.scriptElement);
    }
    
    // Clean up global variable
    if (window.cswidgetoverR) {
      delete window.cswidgetoverR;
    }
  }
}
</script>
