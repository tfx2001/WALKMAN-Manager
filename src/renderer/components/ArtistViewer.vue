<template>
  <a-layout :style="{background: 'white'}">
    <a-layout-sider theme="light" :style="{padding: '24px 0', overflow: 'auto'}">
      <a-menu mode="inline" :style="{height: '100%'}" @click="onClick">
        <a-menu-item v-for="artist in artists" :key="artist">
          <span>{{ artist }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <song-viewer :dataSource="artistSongs" />
    </a-layout-content>
  </a-layout>
</template>

<script>
import SongViewer from "./SongViewer";
import { mapState } from "vuex";

export default {
  name: "ArtistViewer",
  components: {
    SongViewer
  },
  data() {
    return {
      selectedArtist: ""
    };
  },
  computed: {
    artists() {
      let result = new Set();
      for (const i of this.musicFiles) {
        result.add(i.artist);
      }
      return Array.from(result).sort((a, b) => {
        return a.localeCompare(b);
      });
    },
    artistSongs() {
      let that = this;
      return this.musicFiles.filter(val => {
        return val.artist == that.selectedArtist;
      });
    },
    ...mapState(["musicFiles"])
  },
  methods: {
    onClick(val) {
      this.selectedArtist = val.key;
    }
  }
};
</script>

<style>
</style>