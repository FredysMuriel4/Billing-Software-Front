<template lang="es">
  <div>
    <v-header-without-login />
    <div class="container-title">
      <h1 class="title">Acceder al software</h1>
    </div>
    <a-row>
      <a-col :span="12" :offset="6">
        <div>
          <a-row>
            <a-col class="input-container" :span="12" :offset="6">
              <a-input class="input-style" v-model:value="nit" placeholder="Nit" autocomplete="off"/>
            </a-col>
            <a-col :span="12" class="input-container" :offset="6">
              <a-input-password class="input-style" v-model:value="password" placeholder="Contraseña" autocomplete="off" />
            </a-col>
            <a-col :span="12" class="btn-container" :offset="6">
              <a-button @click="onLogin" class="button-style" type="primary">Acceder</a-button>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script type="module" src="./js/LoginView.js" />
<style scoped >
  .input-container { margin-top: 2rem}
  .btn-container { 
    display: flex;
    justify-content: center;
    margin-top: 2rem
  }
  .button-style {
    font-size: 1rem;
    height: 3rem;
  }
  .input-style { 
    height: 3rem;
  }
  .container-title{
    display: flex;
    justify-content: center;
  }
  .title{
    font-weight: bold;
    font-size: 3rem
  }
</style>
