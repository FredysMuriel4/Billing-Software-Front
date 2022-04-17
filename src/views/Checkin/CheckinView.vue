<template lang="js">
  <div>
    <v-header/>
    <div class="container-title">
      <h1 class="title">Facturar</h1>
    </div>
    <a-row class="row-container">
      <a-col :span="6">
        <h2>Emisor</h2>
      </a-col>
      <a-col :span="9" class="column-container">
        <a-input v-model:value="transmitter.name" placeholder="Nombre" />
      </a-col>
      <a-col :span="9" class="column-container">
        <a-input v-model:value="transmitter.nit" placeholder="Nit" />
      </a-col>
    </a-row>
    <a-row class="row-container">
      <a-col :span="6">
        <h2>Receptor</h2>
      </a-col>
      <a-col :span="9" class="column-container">
        <a-input v-model:value="receiver.name" placeholder="Nombre" />
      </a-col>
      <a-col :span="9" class="column-container">
        <a-input v-model:value="receiver.nit" placeholder="Nit" />
      </a-col>
    </a-row>
    <a-row class="row-container">
      <a-col :span="24" class="column-container">
        <v-item-selector v-on:onTotal="onTotal" ref="itemSelectorComponent"/>
      </a-col>
    </a-row>
    <a-row class="row-container">
      <a-col :span="6">
        <h2>Factura</h2>
      </a-col>
      <a-col :span="4" class="column-container">
        <a-input @keyup="calculateVat" v-model:value="vat" placeholder="Iva" />
      </a-col>
      <a-col :span="5" class="column-container">
        <a-input v-model:value="total_before_vat" placeholder="Total parcial" disabled />
      </a-col>
      <a-col :span="5" class="column-container">
        <a-input v-model:value="total" placeholder="Total" disabled />
      </a-col>
      <a-col :span="4" class="column-container">
        <a-button @click="checkin" type="primary" :disabled="disabled" block>Guardar</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script type="module" src="./js/CheckinView.js"/>
<style scoped>
  .row-container {
    border: 1px solid #dfe4ea;
    margin-top: 1em;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .column-container{
    padding: 1em;
  }
  .btn-facturar-container{
    margin-block-start: 1rem;
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