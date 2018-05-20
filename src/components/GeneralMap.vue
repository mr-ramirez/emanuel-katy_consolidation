<template>
  <div>
    <GmapMap
      :center="{lat:29.825704, lng:-95.72114999999997}"
      :zoom="13"
      style="width: 100%; height: 500px"
    ></GmapMap>
  </div>
</template>

<script>
  export default {
    name: 'GeneralMap',
    data() {
      return {
        test: '',
      };
    },
  };
</script>

<style>

</style>
