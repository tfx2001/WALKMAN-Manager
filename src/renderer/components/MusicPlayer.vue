<template>
  <div class="container">
    <div class="album-picture">
      <img :src="imgData" alt="Album picture" class="picture" />
    </div>
    <div class="music-info">
      <span :title="music_title">{{ music_title }}</span>
      <br />
      <span :title="music_artist">{{ music_artist }}</span>
    </div>
    <div class="controller">
      <a-button
        shape="circle"
        type="primary"
        size="large"
        class="play-button"
        @click="onClick"
        v-model="value"
      >
        <a-icon type="pause-circle" v-if="playing" />
        <a-icon type="play-circle" v-else />
      </a-button>
    </div>
    <div class="progress-bar">
      <a-slider
        class="slider"
        :marks="marks"
        :max="duration"
        :disabled="!sound"
        :tipFormatter="null"
        @afterChange="handelAfterChange"
        v-model="value"
      ></a-slider>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Howl } from "howler";
import fs from "fs";
import path from "path";

export default {
  name: "music-player",
  data() {
    return {
      sound: undefined,
      soundID: 0,
      intervalID: 0,
      value: 0,
      imgData: "",
      music_title: "",
      music_artist: ""
    };
  },
  methods: {
    onClick() {
      if (this.sound) {
        if (this.playing) {
          this.sound.pause(this.soundID);
        } else {
          this.sound.play(this.soundID);
        }
      }
    },
    handelAfterChange(value) {
      this.sound.seek(value);
    }
  },
  computed: {
    playing() {
      if (this.sound) return this.sound.playing();
      else return false;
    },
    duration() {
      if (this.sound) return Math.floor(this.sound.duration());
      else return 100;
    },
    marks() {
      if (this.sound) {
        const duration_min = Math.floor(this.duration / 60);
        const duration_sec = Math.floor(this.duration % 60);
        const value_min = Math.floor(this.value / 60);
        const value_sec = Math.floor(this.value % 60);
        const marks = {};
        marks[this.duration] = `${duration_min}:${("0" + duration_sec).substr(
          -2
        )}`;
        marks[0] = `${value_min}:${("0" + value_sec).substr(-2)}`;
        return marks;
      } else {
        return {
          0: "0:00",
          100: "0:00"
        };
      }
    },
    ...mapState(["currentPlayMusic"])
  },
  watch: {
    async currentPlayMusic(val) {
      const musicReader = new FileReader();
      const pictureReader = new FileReader();
      const that = this;
      const metadata = require("music-metadata");
      // 音乐
      if (this.sound) this.sound.stop();
      musicReader.addEventListener("loadend", function() {
        that.sound = new Howl({
          src: this.result,
          format: path.extname(val.key).slice(1)
        });
        that.soundID = that.sound.play();
      });
      musicReader.readAsDataURL(new Blob([fs.readFileSync(val.key)]));
      // 图片
      let metaData = await metadata.parseFile(val.key);
      pictureReader.addEventListener("loadend", function() {
        that.imgData = this.result;
      });
      pictureReader.readAsDataURL(
        new Blob([metaData.common.picture[0].data], {
          format: metaData.common.picture[0].format
        })
      );
      this.music_title = metaData.common.title;
      this.music_artist = metaData.common.artist;
    },
    playing(val) {
      const that = this;
      if (val) {
        that.intervalID = setInterval(function() {
          that.value = Math.floor(that.sound.seek());
        }, 1000);
      } else {
        clearInterval(that.intervalID);
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #002140;
  height: 64px;
  display: -webkit-flex;
  align-items: center;
}
.album-picture {
  width: 64px;
}
.controller {
  width: 72px;
  text-align: center;
}
.music-info {
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 1em;
  width: 64px;
  z-index: 100;
}
.progress-bar {
  width: calc(100% - 236px);
}
.play-button {
  z-index: 100;
}
.picture {
  height: 64px;
  width: 64px;
}
</style>
<style>
.ant-slider-mark-text {
  color: white;
}
</style>