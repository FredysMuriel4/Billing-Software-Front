<template lang="js">
  <div>
    <v-header/>
    <div class="container-title">
      <h1 class="title">{{ $route.query.type == 'edit' ? 'Editar factura' : 'Ver factura' }}</h1>
    </div>
    <a-spin :spinning="loading">
    <a-row class="row-container">
      <a-col :span="6">
        <h2>Emisor</h2>
      </a-col>
      <a-col :span="9" class="column-container">
        <a-input v-model:value="transmitter.name" placeholder="Nombre" :disabled="noEditables" />
      </a-col>
      <a-col :span="9" class="column-container">
        <a-input v-model:value="transmitter.nit" placeholder="Nit" :disabled="noEditables" />
      </a-col>
    </a-row>
    <a-row class="row-container">
      <a-col :span="6">
        <h2>Receptor</h2>
      </a-col>
      <a-col :span="9" class="column-container">
        <a-input v-model:value="receiver.name" placeholder="Nombre" :disabled="noEditables" />
      </a-col>
      <a-col :span="9" class="column-container">
        <a-input v-model:value="receiver.nit" placeholder="Nit" :disabled="noEditables" />
      </a-col>
    </a-row>
    <a-row class="row-container">
      <a-col :span="24" class="column-container">
        <v-item-selector v-if="$route.query.type == 'edit'" v-on:onTotal="onTotal" ref="itemSelectorComponent"/>
        <div v-if="items.length && $route.query.type == 'show'">
          <a-row type="flex">
            <a-col class="column-table-container" :span="6" :order="1"><h2 style="font-weight: bold;"> Producto </h2></a-col>
            <a-col class="column-table-container" :span="6" :order="2"><h2 style="font-weight: bold;"> Cantidad </h2></a-col>
            <a-col class="column-table-container" :span="6" :order="3"><h2 style="font-weight: bold;"> Valor unitario </h2></a-col>
            <a-col class="column-table-container" :span="6" :order="4"><h2 style="font-weight: bold;"> Total </h2></a-col>
          </a-row>
          <a-row type="flex" v-for="(item, i) in items" :key="i">
            <a-col class="column-table-container" :span="6" :order="1"><h3>{{item.get_all_product.product_description}}</h3></a-col>
            <a-col class="column-table-container" :span="6" :order="2"><h3>{{item.quantity}}</h3></a-col>
            <a-col class="column-table-container" :span="6" :order="3"><h3>{{item.get_all_product.product_unity_value}}</h3></a-col>
            <a-col class="column-table-container" :span="6" :order="4"><h3>{{item.total}}</h3></a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <a-row class="row-container">
      <a-col :span="6">
        <h2>Factura</h2>
      </a-col>
      <a-col :span="4" class="column-container">
        <a-input @keyup="calculateVat" v-model:value="vat" placeholder="Iva" :disabled="noEditables" />
      </a-col>
      <a-col :span="5" class="column-container">
        <a-input v-model:value="total_before_vat" placeholder="Total parcial" disabled />
      </a-col>
      <a-col :span="5" class="column-container">
        <a-input v-model:value="total" placeholder="Total" disabled />
      </a-col>
      <a-col :span="4" class="column-container">
        <a-button v-if="$route.query.type != 'show'" @click="checkin" type="primary" :disabled="disabled"  block>Actualizar</a-button>
      </a-col>
    </a-row>
    </a-spin>
  </div>
</template>
<script type="module" src="./js/InvoiceDataView.js"/>
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
  .column-table-container{
    text-align: center;
    border: 1px solid black;
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