<template>
  <a-locale-provider :locale="locale">
    <a-layout :style="{top: 0, bottom: 0, left: 0, right: 0, position: 'fixed'}">
      <a-layout-sider
        :style="{overflow: 'auto'}"
      >
        <side-menu
          :isOpenFoldered="true"
          @musicClicked="onMusicClicked"
          @albumClicked="onAlbumClicked"
          @artistClicked="onArtistClicked"
          @openFolderButtonClick="onOpenFolderButtonClick"
          @onPlayListItemClicked="onPlayListItemClicked"
        />
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{padding: '16px'}">
          <component
            :is="this.currentComponent"
            v-bind="currentProp"
            style="height: -webkit-fill-available; padding-bottom: 48px;"
          ></component>
        </a-layout-content>
        <a-layout-footer style="padding: 0; z-index: 100;">
          <music-player></music-player>
        </a-layout-footer>
      </a-layout>
      <a-modal
        v-model="modalVisiable"
        title="正在导入"
        :footer="null"
        :closable="false"
        :maskClosable="false"
        :keyboard="false"
      >
        <a-progress :percent="importPercent" status="active" />
      </a-modal>
    </a-layout>
  </a-locale-provider>
</template>

<script>
import { mapState } from "vuex";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import SideMenu from "./components/SideMenu.vue";
import SongViewer from "./components/SongViewer.vue";
import ArtistViewer from "./components/ArtistViewer.vue";
import AlbumViewer from "./components/AlbumViewer.vue";
import PlayListViewer from "./components/PlayListViewer.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
import Tip from "./components/Tip.vue";
import fs from "fs";
import path from "path";

const comps = [Tip, SongViewer, ArtistViewer, AlbumViewer, PlayListViewer];

function recursiveSearchFiles(currentPath) {
  let result = {
    musicFiles: [],
    playListFiles: []
  };
  for (var file of fs.readdirSync(currentPath)) {
    if (fs.statSync(`${currentPath}\\${file}`).isDirectory()) {
      let tempResult = recursiveSearchFiles(`${currentPath}\\${file}`);
      result.musicFiles = result.musicFiles.concat(tempResult.musicFiles);
      result.playListFiles = result.playListFiles.concat(
        tempResult.playListFiles
      );
    } else {
      if (
        [".mp3", ".ape", ".flac"].includes(path.extname(file).toLowerCase())
      ) {
        result.musicFiles.push(path.normalize(`${currentPath}\\${file}`));
      } else if ([".m3u8"].includes(path.extname(file).toLowerCase())) {
        result.playListFiles.push(path.normalize(`${currentPath}\\${file}`));
      }
    }
  }
  return result;
}

export default {
  name: "walkman-manager",
  components: { SideMenu, MusicPlayer },
  data() {
    return {
      locale: zhCN,
      currentComponent: comps[1],
      modalVisiable: false,
      importPercent: 0
    };
  },
  computed: {
    currentProp: function() {
      if (this.currentComponent.name == "Tip") {
        return { description: "请先打开一个文件夹。" };
      } else if (this.currentComponent.name == "SongViewer") {
        return { dataSource: this.musicFiles };
      } else {
        return {};
      }
    },
    ...mapState(["musicFiles", "playListFiles", "currentPlayListFile"])
  },
  methods: {
    onMusicClicked() {
      this.currentComponent = comps[1];
    },
    onArtistClicked() {
      this.currentComponent = comps[2];
    },
    onAlbumClicked() {
      this.currentComponent = comps[3];
    },
    onPlayListItemClicked(key) {
      this.$store.commit("setCurrentPlayListFile", key);
      this.currentComponent = comps[4];
    },
    async onOpenFolderButtonClick() {
      const dialog = this.$electron.remote.dialog;
      const mm = require("music-metadata");

      var initDir = dialog.showOpenDialog({
        properties: ["openDirectory"]
      });

      if (initDir) {
        this.$store.commit("setOpenFolder", initDir[0]);
        this.modalVisiable = true;
        let { musicFiles, playListFiles } = recursiveSearchFiles(initDir[0]);
        let index = 0,
          totalImport = musicFiles.length;
        let sortedMusicFiles = [];
        for (const file of musicFiles) {
          let metadata = await mm.parseFile(file);
          sortedMusicFiles.push({
            title: metadata.common.title,
            artist: metadata.common.artist,
            album: metadata.common.album,
            size: fs.statSync(file).size,
            length: Math.floor(metadata.format.duration),
            key: file
          });
          index += 1;
          this.importPercent = Math.ceil((index / totalImport) * 100);
        }
        this.$store.commit(
          "setMusicFiles",
          sortedMusicFiles.sort((a, b) => {
            if (a.title) {
              return a.title.localeCompare(b.title);
            } else {
              return true;
            }
          })
        );
        this.$store.commit(
          "setPlayListFiles",
          playListFiles.map(value => {
            return {
              name: path.basename(value, ".m3u8"),
              file: value
            };
          })
        );
        this.modalVisiable = false;
      }
    }
  }
};
</script>

<style>
body {
  user-select: none; /* 禁止选择文字 */
}
</style>
