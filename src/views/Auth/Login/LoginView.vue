<template lang="es">
  <div>
    <v-header-without-login />
    <a-row>
      <a-col :span="12" :offset="6">
        <div style="margin-top: 2rem">
          <a-row>
            <a-col class="input-container" :span="12" :offset="6">
              <h2>Usuario: {{nit}}</h2>
              <a-input class="input-style" v-model:value="nit" placeholder="Nit" autocomplete="off"/>
            </a-col>
            <a-col :span="12" class="input-container" :offset="6">
              <h2>Password: {{password}}</h2>
              <a-input-password class="input-style" v-model:value="password" placeholder="Contraseña" autocomplete="off" />
            </a-col>
            <a-col :span="12" class="input-container" :offset="6">
              <a-button @click="onLogin" class="button-style" type="primary"><right-circle-outlined /></a-button>
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
  .button-style {
    font-size: 1.5rem;
    height: 3rem;
  }
  .input-style { 
    height: 3rem;
  }
</style>
