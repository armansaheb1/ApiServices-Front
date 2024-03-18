<template>
  <router-view />
  <vue-final-modal style="width:100% ; background:none" v-model="$store.state.loginPopUp">
    <login />
  </vue-final-modal>

</template>
<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useColorModes } from '@coreui/vue'
import { VueFinalModal } from 'vue-final-modal'
import axios from 'axios'
import login from './Login.vue'

export default {
  components: {
    VueFinalModal,
    login
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common.Authorization = 'Token ' + token
      this.$store.state.isAuthenticated = true
    } else {
      axios.defaults.headers.common.Authorization = ''
    }
  },
  setup() {
    const { isColorModeSet, setColorMode } = useColorModes(
      'coreui-free-vue-admin-template-theme',
    )
    const store = useStore()

    onBeforeMount(() => {
      const urlParams = new URLSearchParams(window.location.href.split('?')[1])
      const theme =
        urlParams.get('theme') &&
        urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
      if (theme) {
        setColorMode(theme)
        return
      }

      if (isColorModeSet()) {
        return
      }

      setColorMode(store.state.theme)
    })
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
// We use those styles to show code examples, you should remove them in your application.
@import 'styles/examples';
</style>
