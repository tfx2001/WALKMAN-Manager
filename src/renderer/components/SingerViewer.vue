<template>
  <a-layout>
    <a-layout-sider></a-layout-sider>
    <a-layout-content>
      <song-viewer />
    </a-layout-content>
  </a-layout>
</template>

<script>

import SongViewer from "./SongViewer";

export default {
  name: "SingerViewer",
  components: {
    SongViewer
  },
  methods: {}
};
</script>

<style>
</style>