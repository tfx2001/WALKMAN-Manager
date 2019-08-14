<template>
  <a-layout :style="{background: 'white'}">
    <a-layout-sider theme="light" :style="{padding: '24px 0'}">
      <a-menu mode="inline" :style="{height: '100%'}" @click="onClick">
        <a-menu-item v-for="singer in singers" :key="singer">
          <span>{{ singer }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <song-viewer :dataSource="this.singerSongs" @deleteFiles="onDeleteFiles" />
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
  data() {
    return {
      selectedSinger: ""
    };
  },
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    singers() {
      let result = new Set();
      for (var i of this.dataSource) {
        result.add(i.singer);
      }
      return Array.from(result);
    },
    singerSongs() {
      let that = this;
      console.log("called");
      return this.dataSource.filter(obj => {
        return obj.singer == that.selectedSinger;
      });
    }
  },
  methods: {
    onClick(obj) {
      this.selectedSinger = obj.key;
    },
    onDeleteFiles(selectedKeys) {
      this.$emit("deleteFiles", selectedKeys);
    }
  }
};
</script>

<style>
</style>