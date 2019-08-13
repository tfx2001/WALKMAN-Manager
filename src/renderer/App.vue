<template>
  <a-locale-provider :locale="locale">
    <div id="app">
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
            @singerClicked="onSingerClicked"
          />
        </a-layout-sider>
        <a-layout>
          <a-layout-content :style="{padding: '16px 16px 0px 16px'}">
            <component
              :is="this.currentComponent"
              v-bind="currentProp"
              @deleteFiles="onDeleteFiles"
            ></component>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import SideMenu from "./components/SideMenu.vue";
import SongViewer from "./components/SongViewer.vue";
import SingerViewer from "./components/SingerViewer.vue";
import AlbumViewer from "./components/AlbumViewer.vue";
import PlayListViewer from "./components/PlayListViewer.vue";
import Tip from "./components/Tip.vue";

const comps = [Tip, SongViewer, SingerViewer, AlbumViewer, PlayListViewer];

export default {
  name: "walkman-manager",
  components: { SideMenu },
  data() {
    return {
      locale: zhCN,
      currentComponent: comps[1],
      musicFiles: [
        {
          title: "Lemon1",
          singer: "米津玄师1",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "1"
        },
        {
          title: "Lemon2",
          singer: "米津玄师1",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "2"
        },
        {
          title: "Lemon3",
          singer: "米津玄师1",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "3"
        },
        {
          title: "Lemon1",
          singer: "米津玄师2",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "3"
        },
        {
          title: "Lemon2",
          singer: "米津玄师2",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "3"
        },
        {
          title: "Lemon3",
          singer: "米津玄师2",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "3"
        },
        {
          title: "Lemon1",
          singer: "米津玄师3",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "3"
        },
        {
          title: "Lemon2",
          singer: "米津玄师3",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "3"
        },
        {
          title: "Lemon3",
          singer: "米津玄师3",
          album: "Lemon",
          length: "3:03",
          size: "0.5MB",
          key: "3"
        }
      ]
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
    // 所有歌曲被选中
    onMusicClicked() {
      this.currentComponent = comps[1];
    },
    onSingerClicked() {
      this.currentComponent = comps[2];
    },
    onAlbumClicked() {
      this.currentComponent = comps[3];
    },
    onDeleteFiles(deleteKeys) {
      this.musicFiles = this.musicFiles.filter(obj => {
        return deleteKeys.indexOf(obj.key) == -1;
      });
    }
  }
};
</script>

<style>
body {
  user-select: none; /* 禁止选择文字 */
}
</style>
