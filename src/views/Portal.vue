<template>
  <h2>Portal Example</h2>
  <div id="portal-wrapper">
    <!-- insert script here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      scriptElement: null
    }
  },
  mounted() {
    const useBeta = import.meta.env.VITE_USE_BETA === 'true';
    // Load the second external script
    const script2 = document.createElement('script');
    script2.src = `https://${useBeta ? 'portalbeta.cityspark.com' : 'localhost:44389'}/PortalScripts/ty-portal-hash`;
    script2.type = "text/javascript";
    script2.onload = () => console.log('CitySpark script loaded');
    script2.onerror = () => console.error('Failed to load CitySpark script');
    
    // Store reference to the script element
    this.scriptElement = script2;
    
    const portalWrapper = document.getElementById("portal-wrapper");
    console.log(portalWrapper);
    portalWrapper.appendChild(script2);
  },
  beforeUnmount() {
    const portalWrapper = document.getElementById("portal-wrapper");
    portalWrapper.innerHTML = "";
    // Clean up the script when component is unmounted
    if (this.scriptElement && this.scriptElement.parentNode) {
      this.scriptElement.parentNode.innerHTML = "";
      // this.scriptElement.parentNode.removeChild(this.scriptElement);
    }
  }
}
</script>
