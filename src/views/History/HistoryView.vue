<template lang="">
  <div>
    <v-header/>
    <div class="container-title">
      <h1 class="title">Historial</h1>
    </div>
    <a-row justify="end">
      <a-col :span="6">
        <a-row>
          <a-col :span="14">
            <a-input v-model:value="query" placeholder="Factura" block />
          </a-col>
          <a-col :span="10">
            <a-select
              style="width: 100%"
              v-model:value="order"
              :options="orderOptions"
              @select="onChangeOrder"
            ></a-select>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-spin :spinning="loading">
    <div style="margin-top: 2rem; text-align: center">
      <a-row style="margin-bottom: 1rem">
        <a-col :span="4" class="col-container">
          <h2 style="font-weight: bold;">Factura</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2 style="font-weight: bold;">Emisor</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2 style="font-weight: bold;">Receptor</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2 style="font-weight: bold;">Fecha</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2 style="font-weight: bold;">Productos</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2 style="font-weight: bold;">Opciones</h2>
        </a-col>
      </a-row>

      <a-row v-for="(invoice) in invoicesData" :key="invoice.id">
        <a-col :span="4" class="col-container">
          <h2>{{invoice.invoice_number}}</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2>{{invoice.get_transmitter.name}}</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2>{{invoice.get_receiver.name}}</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2>{{invoice.invoice_date}}</h2>
        </a-col>
        <a-col :span="4" class="col-container">
          <h2>{{invoice.get_items.length}}</h2>
        </a-col>
        <a-col :span="4" class="col-container col-actions">
          <a-button @click="goToEdit(invoice.id)" style="background-color: #81ecec"><form-outlined /></a-button>
          <a-button @click="goToShow(invoice.id)" style="background-color: #55efc4"><file-search-outlined /></a-button>
        </a-col>
      </a-row>
      <a-row v-if="!invoicesData.length">
        <a-col class="col-container" :span="24"> 
          <h1>NO HAY DATOS</h1>
        </a-col>
      </a-row>
    </div>
    </a-spin>
  </div>
</template>
<script type="module" src="./js/HistoryView.js"/>
<style scoped>
  .col-container{
    border: 1px solid black;
  }
  .col-actions{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
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