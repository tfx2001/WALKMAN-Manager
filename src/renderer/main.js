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
  Progress
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
Vue.use(Vuex)

if (!process.env.IS_WEB)
  Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    musicFiles: [],
    playListFiles: [],
    currentPlayListFile: ""
  },
  mutations: {
    updateMusicFiles(state, musicFiles) {
      state.musicFiles = musicFiles;
    },
    deleteMusicFiles(state, deleteKeys) {
      state.musicFiles = state.musicFiles.filter(val => {
        return deleteKeys.indexOf(val.key) == -1;
      })
    },
    updatePlayListFiles(state, playListFiles) {
      state.playListFiles = playListFiles
    },
    updateCurrentPlayListFile(state, currentPlayListFile) {
      state.currentPlayListFile = currentPlayListFile
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
