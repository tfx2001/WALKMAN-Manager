import { Button, Col, Row, Menu, Icon, Layout, LocaleProvider, Alert, Table, Dropdown } from 'ant-design-vue'
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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


library.add(faMusic)

Vue.component('font-awesome-icon', FontAwesomeIcon)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
