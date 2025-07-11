<template>
  <h2>Widget Example</h2>
  <div class="wid-id-form">
    <label for="widID">Widget ID</label>
    <input id="widID" v-model="widgetID"/>
    <button @click="toggleWidget()">Reload Widget</button>
  </div>
  <hr/>
  <div id="content-wrapper" style="display: flex; justify-content: center;">
      <div :data-cswidget="widgetID"> 
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      </div>
  </div>
</template>

<style scoped>
.wid-id-form {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 1rem;
}

.wid-id-form input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.wid-id-form button {
  padding: 9px 16px;
  border: none;
  background-color: #2c6fbb;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;
}

.wid-id-form button:hover {
  background-color: #245a99;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #2c6fbb;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
    this.mountWidget()
  },
  beforeUnmount() {
    this.unmountWidget()
  },
  methods: {
    unmountWidget() {
      // Remove the script element if it exists
      if (this.scriptElement && this.scriptElement.parentNode) {
        this.scriptElement.parentNode.removeChild(this.scriptElement)
        this.scriptElement = null
      }
      
      // Clear any widget content
      const contentWrapper = document.getElementById('content-wrapper')
      if (contentWrapper) {
        // get the first div child and clear its contents
        const widgetDiv = contentWrapper.querySelector('div[data-cswidget]')
        if (widgetDiv) {
          widgetDiv.innerHTML = ` <div class="spinner-container"> <div class="spinner"></div> </div>`;
        }
      }
    },
    
    mountWidget() {
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
    
    toggleWidget() {
      // Unmount then mount in order
      this.unmountWidget()
      // Small delay to ensure unmounting is complete
      this.$nextTick(() => {
        this.mountWidget()
      })
    }
  }
}
</script>
