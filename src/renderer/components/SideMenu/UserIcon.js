import { Icon } from "ant-design-vue";
import Vue from "vue";

Vue.use(Icon);

const MusicSvg = {
    template: `<font-awesome-icon icon="music"/>`
};

const MusicIcon = {
    name: 'music-icon',
    template: `<a-icon :component="MusicSvg"/>`,
    data() {
        return {
            MusicSvg
        };
    }
};

const PlayListFillSvg = {
    template: `<svg t="1565170129866" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1433" width="200" height="200"><path d="M85.333333 768h426.666667v85.333333H85.333333v-85.333333z m0-298.666667h597.333334v85.333334H85.333333v-85.333334z m0-298.666666h853.333334v85.333333H85.333333V170.666667z m725.333334 476.586666V384h213.333333v85.333333h-128v298.666667a128 128 0 1 1-85.333333-120.746667z" p-id="1434"></path></svg>`
};

const PlayListFillIcon = {
    name: "play-list-fill-icon",
    template: `<a-icon :component="PlayListFillSvg"></a-icon>`,
    data() {
        return {
            PlayListFillSvg
        }
    }
};

export {
    MusicIcon, PlayListFillIcon
}