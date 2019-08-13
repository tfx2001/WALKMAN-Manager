<template>
    <a-locale-provider :locale="locale">
        <div id="app">
            <a-layout :style="{top: 0, bottom: 0, left: 0, right: 0, position: 'fixed'}">
                <a-layout-sider :style="{overflow: 'auto', marginBottom: '48px'}" collapsible defaultCollapsed>
                    <side-menu @allMusicClicked="onAllMusicClicked" />
                </a-layout-sider>
                <a-layout>
                    <a-layout-content :style="{padding: '16px 16px 0px 16px'}">
                        <component :is="this.currentComponent" v-bind="currentProp"></component>
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </div>
    </a-locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import SideMenu from "./components/SideMenu";
import SongViewer from "./components/SongViewer";
import Tip from "./components/Tip";

const comps = [Tip, SongViewer];

export default {
    name: "walkman-manager",
    components: { SideMenu },
    data() {
        return {
            locale: zhCN,
            currentComponent: comps[1]
        };
    },
    computed: {
        currentProp: function() {
            if (this.currentComponent.name == "Tip") {
                return { description: "请先打开一个文件夹。" };
            } else {
                return {};
            }
        }
    },
    methods: {
        // 所有歌曲被选中
        onAllMusicClicked() {
            
        }
    }
};
</script>

<style>
body {
    user-select: none; /* 禁止选择文字 */
}
</style>
