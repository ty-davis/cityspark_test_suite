<template>
  <h2>Widget Example</h2>
  <div class="wid-id-form">
    <div class="wid-id-form-row">
      <label for="widID">Widget ID</label>
      <input id="widID" v-model="widgetID"/>
      <button @click="toggleWidget()">Reload Widget</button>
    </div>
    <div class="wid-id-form-row">
      <input type="range" v-model="widWidth" min="250" max="1000"></input>
      {{ widWidth }}px
    </div>
  </div>
  <hr/>
  <div :style="{maxWidth: `${widWidth}px`, marginLeft: 'auto', marginRight: 'auto'}" style="margin-top: 1rem;">
    A few widget IDs that show the Article widget:

    <div>
      <template v-for="wid in ['7065', '7066', '7067']">
        <button class="button" style="margin-right: 0.5rem;" @click="gotoWidget(wid)"> {{ wid }} </button>
      </template>
    </div>
  </div>

  <div :style="{maxWidth: `${widWidth}px`, marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem'}" v-if="widgetID == '7065'">

    Here is an example site that I made that shows the use
    of the widget. Widget 7065 shows the use of the "Bypass
    date filter" option on the <a href="https://adminbeta.cityspark.com/Widget/Edit/7065" target="_blank">admin.cityspark.com</a>
    page, which allows the user to select specific events
    regardless of the date according to a label that exists on
    those events (in this case the label is "articleot"). This particular
    widget shows all of the events from the Ogden Twilight series of 
    concerts.

  </div>

  <div id="content-stage" style="overflow-x: scroll; width: 100%; margin-bottom: 100px;">
    <div id="content-wrapper" :style="`justify-content: center; width: ${widWidth}px; margin-left: auto; margin-right: auto;`">
      <div :data-cswidget="widgetID"> 
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wid-id-form {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 1rem;
}
.wid-id-form-row {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 1rem;
}
.wid-id-form input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 60px;
  max-width: 90%;
}

button {
  padding: 9px 16px;
  border: none;
  background-color: #2c6fbb;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const widgetID = ref("7065");
const widWidth = ref(700);
const scriptElement = ref(null);

function unmountWidget() {
  // Remove the script element if it exists
  if (scriptElement.value && scriptElement.value.parentNode) {
    scriptElement.value.parentNode.removeChild(scriptElement.value);
    scriptElement.value = null;
  }

  // Clear any widget content
  const contentWrapper = document.getElementById('content-wrapper');
  if (contentWrapper) {
    // get the first div child and clear its contents
    const widgetDiv = contentWrapper.querySelector('div[data-cswidget]');
    if (widgetDiv) {
      widgetDiv.innerHTML = ` <div class="spinner-container"> <div class="spinner"></div> </div>`;
    }
  }
}

function mountWidget() {
  const useBeta = import.meta.env.VITE_USE_BETA === 'true';
  window.cswidgetoverR = {
    portal: "//portalbeta.cityspark.com/",
    wportal: useBeta ? "https://pbeta.cityspark.com/" : "https://localhost:44133/"
  };

  const script = document.createElement('script');
  script.src = "//cdn.cityspark.com/wid/get.js";
  script.async = true;
  script.defer = true;

  // Store reference to the script element
  scriptElement.value = script;

  const wrap = document.getElementById("content-wrapper");
  wrap.appendChild(script);
}

function toggleWidget() {
  // Unmount then mount in order
  unmountWidget();
  // Small delay to ensure unmounting is complete
  nextTick(() => {
    mountWidget();
  });
}

function gotoWidget(wid) {
  widgetID.value = wid;
  toggleWidget();
}

onMounted(() => {
  mountWidget();
});

onBeforeUnmount(() => {
  unmountWidget();
});
</script>
