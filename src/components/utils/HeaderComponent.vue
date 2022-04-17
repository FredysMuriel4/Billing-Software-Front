<template>
  <div>
    <a-page-header
      class="demo-page-header"
      style="border: 1px solid rgb(235, 237, 240)"
      title="Facturación"
    >
      <template #extra>
        <a-button key="0" @click="() => { $router.push('/') }">Inicio</a-button>
        <a-button type="link" key="1" @click="() => { $router.push('/checkin') }">Facturar</a-button>
        <a-button type="link" key="2" @click="() => { $router.push('/history') }">Historial</a-button>
        <a-button key="3" @click="onLogout" danger ghost>Logout</a-button>
      </template>
    </a-page-header>
  </div>
</template>

<script>
import axios from 'axios/index';
import AsyncHandler from './../../utils/AsyncHandler'

export default {
  data() {
    return {
      nit: '',
      password: ''
    }
  },
  methods: {
    onLogout() {
      AsyncHandler(logoutHandler ,this)
    }
  },
}

async function logoutHandler(component){
  const user_session = JSON.parse(localStorage.getItem('user_token'));
      await axios.post(`${process.env.VUE_APP_URL_BASE_API}api/log-out`, { 
        headers: {
          'Authorization': `basic ${user_session.token}`
        }
      })

      localStorage.clear()
      component.$router.push('/login')
}

</script>


<style scoped>
.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}
</style>