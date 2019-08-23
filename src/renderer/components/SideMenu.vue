<template>
  <div id="side-menu">
    <div :style="{margin: '16px'}">
      <button-open-folder :collapsed="$parent.sCollapsed" @click="onOpenFolderButtonClick">打开文件夹</button-open-folder>
    </div>
    <a-menu mode="inline" theme="dark">
      <a-sub-menu>
        <span slot="title">
          <music-icon />
          <span>歌曲</span>
        </span>
        <a-menu-item :disabled="!isOpenFoldered" @click="$emit('musicClicked')">
          <all-icon />
          <span>所有歌曲</span>
        </a-menu-item>
        <a-menu-item :disabled="!isOpenFoldered" @click="$emit('albumClicked')">
          <album-icon />
          <span>专辑</span>
        </a-menu-item>
        <a-menu-item :disabled="!isOpenFoldered" @click="$emit('artistClicked')">
          <singer-icon />
          <span>歌手</span>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu>
        <span slot="title">
          <play-list-fill-icon />
          <span>播放列表</span>
        </span>
        <a-menu-item v-if="!playList.length" disabled>无</a-menu-item>
        <a-menu-item
          v-else
          v-for="item in playList"
          :key="item.dir"
          @click="$emit('onPlayListItemClicked', $event.key)"
        >{{ item.name }}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import ButtonOpenFolder from "./SideMenu/ButtonOpenFolder";
import {
  PlayListFillIcon,
  MusicIcon,
  AllIcon,
  SingerIcon,
  AlbumIcon
} from "./SideMenu/UserIcon";

export default {
  name: "side-menu",
  components: {
    ButtonOpenFolder,
    MusicIcon,
    PlayListFillIcon,
    AllIcon,
    SingerIcon,
    AlbumIcon
  },
  props: {
    playList: {
      type: Array,
      default() {
        return [];
      }
    },
    isOpenFoldered: Boolean
  },
  methods: {
    onOpenFolderButtonClick() {
      this.$emit("openFolderButtonClick");
    }
  }
};
</script>

<style>
</style>
