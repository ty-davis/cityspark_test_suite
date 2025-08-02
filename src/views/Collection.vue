<template>
  <h2>Collection Example</h2>
  <div id="content-wrapper" style="display: flex; justify-content: center;">
    <div data-cswidget="L1007"></div>
  </div>
</template>

<script>
export default {
  name: 'Collection',
  data() {
    return {
      scriptElement: null
    }
  },
  mounted() {
    const useBeta = import.meta.env.VITE_USE_BETA === 'true';
    window.cswidgetoverR = {
      portal: "//portalbeta.cityspark.com/",
      wportal: useBeta ? "https://pbeta.cityspark.com/" : "https://localhost:44133/"
    };

    const script = document.createElement('script');
    script.src = "https://cdn.cityspark.com/wid/get.js"
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
