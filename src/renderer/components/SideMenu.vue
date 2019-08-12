<template>
    <div id="side-menu">
        <div :style="{margin: '16px'}">
            <button-open-folder :collapsed="$parent.sCollapsed">打开文件夹</button-open-folder>
        </div>
        <a-menu mode="inline" theme="dark">
            <a-sub-menu>
                <span slot="title">
                    <music-icon />
                    <span>歌曲</span>
                </span>
                <a-menu-item>
                    <span>所有歌曲</span>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu>
                <span slot="title">
                    <play-list-fill-icon />
                    <span>播放列表</span>
                </span>
                <a-menu-item v-if="!playList.length" disabled>请先打开文件夹</a-menu-item>
                <a-menu-item
                    v-else
                    v-for="[index, item] in playList.entries()"
                    :key="playList.indexOf(item)"
                >{{ item.name }}</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
import ButtonOpenFolder from "./SideMenu/ButtonOpenFolder";
import { PlayListFillIcon, MusicIcon } from "./SideMenu/UserIcon";

export default {
    name: "side-menu",
    components: {
        ButtonOpenFolder,
        MusicIcon,
        PlayListFillIcon
    },
    props: {
        playList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            test: 1
        };
    }
};
</script>

<style>
</style>
