
<template>
  <div id="app">
    <AppNavbar/>
    <router-view/>
    <Notification/>
  </div>
</template>

<script>
import AppNavbar from './containers/app_navbar'
import AppFooter from './containers/app_footer'
import Notification from './containers/app_notification'

export default {
  name: 'app',

  // Top-Level Application Components
  components: {
    AppNavbar,
    Notification,
    AppFooter
  },

  // Top-Level page Meta
  metaInfo: {
    title: 'Home', // set a title
    titleTemplate: 'EB - %s', // title is now "RCOS - Loading..."
    htmlAttrs: {
      lang: 'en'
    }
  }

}
</script>

<style type="text/css">
  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  .container-fluid {
    height: 100%;
  }

  #app {
    height: 100%;
  }
</style>
