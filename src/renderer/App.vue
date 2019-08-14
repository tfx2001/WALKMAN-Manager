<template>
  <a-locale-provider :locale="locale">
    <a-layout :style="{top: 0, bottom: 0, left: 0, right: 0, position: 'fixed'}">
      <a-layout-sider
        :style="{overflow: 'auto', marginBottom: '48px'}"
        collapsible
        defaultCollapsed
      >
        <side-menu
          :isOpenFoldered="true"
          @musicClicked="onMusicClicked"
          @albumClicked="onAlbumClicked"
          @artistClicked="onArtistClicked"
          @openFolderButtonClick="onOpenFolderButtonClick"
        />
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{padding: '16px'}">
          <component
            :is="this.currentComponent"
            v-bind="currentProp"
            @deleteFiles="onDeleteFiles"
            :style="{height: '-webkit-fill-available'}"
          ></component>
        </a-layout-content>
      </a-layout>
      <a-modal
        v-model="visible"
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
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import SideMenu from "./components/SideMenu.vue";
import SongViewer from "./components/SongViewer.vue";
import ArtistViewer from "./components/ArtistViewer.vue";
import AlbumViewer from "./components/AlbumViewer.vue";
import PlayListViewer from "./components/PlayListViewer.vue";
import Tip from "./components/Tip.vue";
import fs from "fs";
import path from "path";

const comps = [Tip, SongViewer, ArtistViewer, AlbumViewer, PlayListViewer];

function recursiveSearch(currentPath) {
  let result = [];
  for (var file of fs.readdirSync(currentPath)) {
    if (fs.statSync(`${currentPath}\\${file}`).isDirectory()) {
      result = result.concat(recursiveSearch(`${currentPath}\\${file}`));
    } else {
      if ([".mp3", ".ape", ".flac"].includes(path.extname(file))) {
        result.push(path.normalize(`${currentPath}\\${file}`));
      }
    }
  }
  return result;
}

export default {
  name: "walkman-manager",
  components: { SideMenu },
  data() {
    return {
      locale: zhCN,
      currentComponent: comps[1],
      musicFiles: [],
      visible: false,
      importPercent: 0
    };
  },
  computed: {
    currentProp: function() {
      if (this.currentComponent.name == "Tip") {
        return { description: "请先打开一个文件夹。" };
      } else {
        return { dataSource: this.musicFiles };
      }
    }
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
    onDeleteFiles(deleteKeys) {
      this.musicFiles = this.musicFiles.filter(obj => {
        return deleteKeys.indexOf(obj.key) == -1;
      });
    },
    async onOpenFolderButtonClick() {
      const dialog = this.$electron.remote.dialog;
      const mm = require("music-metadata");

      var initDir = dialog.showOpenDialog({
        properties: ["openDirectory"]
      });

      if (initDir) {
        this.visible = true;
        let musicFileDirs = recursiveSearch(initDir[0]);
        let index = 0,
          totalImport = musicFileDirs.length;
        let sortedMusicFiles = [];
        for (const dir of musicFileDirs) {
          let metadata = await mm.parseFile(dir);
          sortedMusicFiles.push({
            title: metadata.common.title,
            artist: metadata.common.artist,
            album: metadata.common.album,
            size: fs.statSync(dir).size,
            key: dir
          });
          index += 1;
          this.importPercent = Math.ceil((index / totalImport) * 100);
        }
        this.musicFiles = sortedMusicFiles.sort((a, b) => {
          if (a.title) {
            return a.title.localeCompare(b.title);
          } else {
            return true;
          }
        });
        this.visible = false;
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
