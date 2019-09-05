import {
  Button,
  Col,
  Row,
  Menu,
  Icon,
  Layout,
  LocaleProvider,
  Alert,
  Table,
  Dropdown,
  Modal,
  Progress,
  message,
  Input
} from 'ant-design-vue'
import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(LocaleProvider)
Vue.use(Alert)
Vue.use(Table)
Vue.use(Dropdown)
Vue.use(Modal)
Vue.use(Progress)
Vue.use(Input)
Vue.use(Vuex)

Vue.prototype.$message = message

if (!process.env.IS_WEB)
  Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    musicFiles: [],
    playListFiles: [],
    currentPlayListFile: "",
    openFolder: ""
  },
  mutations: {
    setMusicFiles(state, musicFiles) {
      state.musicFiles = musicFiles;
    },
    deleteMusicFiles(state, deleteKeys) {
      state.musicFiles = state.musicFiles.filter(val => {
        return deleteKeys.indexOf(val.key) == -1;
      })
    },
    setPlayListFiles(state, playListFiles) {
      state.playListFiles = playListFiles
    },
    appendPlayListFiles(state, playListFile) {
      state.playListFiles.push(playListFile)
    },
    setCurrentPlayListFile(state, currentPlayListFile) {
      state.currentPlayListFile = currentPlayListFile
    },
    setOpenFolder(state, currentOpenFolder) {
      state.openFolder = currentOpenFolder
    }
  }
})

new Vue({
  components: {
    App
  },
  template: '<App/>',
  store
}).$mount('#app')
