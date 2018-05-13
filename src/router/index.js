import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        main: Main,
        footer: Footer
      }
    }
  ]
})
