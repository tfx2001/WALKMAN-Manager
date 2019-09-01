<template>
  <div>
    <song-viewer
      v-model="playListSongs"
      :playList="true"
    ></song-viewer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongViewer from "./SongViewer.vue";
import fs from "fs";
import path from "path";
import m3u8Reader from "m3u8-reader";

export default {
  name: "PlayListViewer",
  components: { SongViewer },
  data() {
    return {
      playListSongs: []
    };
  },
  computed: {
    ...mapState(["currentPlayListFile"])
  },
  watch: {
    currentPlayListFile: {
      handler: async function(val) {
        const mm = require("music-metadata");
        let result = [];
        for (var i of m3u8Reader(fs.readFileSync(val, "utf8")).filter(item => {
          return typeof item == "string";
        })) {
          i = path.normalize(`${path.dirname(val)}\\${i}`);
          let metadata = await mm.parseFile(i);
          result.push({
            title: metadata.common.title,
            artist: metadata.common.artist,
            album: metadata.common.album,
            size: fs.statSync(i).size,
            key: i
          });
        }
        this.playListSongs = result.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      },
      immediate: true
    }
  }
};
</script>

<style>
</style>