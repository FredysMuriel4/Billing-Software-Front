<template>
  <div>
    <a-row>
      <a-col :span="6" :order="1" class="column-container">
        <a-select
          v-model:value="itemId"
          style="width: 100%"
          :options="options"
          placeholder="Seleccione" 
          @change="onChange"
        />
      </a-col>
      <a-col :span="1" class="column-container">
        <v-create-product v-on:onProductCreated="onProductCreated"/>
      </a-col>
      <a-col :span="5" :order="1" class="column-container">
        <a-input-number :disabled="!itemId ? true : false" @keyup="onKeyupAmountInput" style="width: 100%" v-model:value="itemAmount" placeholder="Cantidad" />
      </a-col>
      <a-col :span="6" :order="1" class="column-container">
        <a-input-number :disabled="true" style="width: 100%" v-model:value="itemValue" placeholder="Valor" />
      </a-col>
      <a-col :span="6" :order="1" class="column-container">
        <a-button :disabled="itemAmount < 1 ? true : false" @click="addItem" style="width: 100%" type="primary">Agregar</a-button>
      </a-col>
      
    </a-row>
    <template v-if="items.length">
      <!-- <div v-for="(item, i) in items" :key="i" class="item-container">
        <a-button type="primary" @click="deleteItem(item.id)" danger style="margin-right: 1rem;"><delete-outlined /></a-button> 
        <span class="span-text">{{item.quantity}}  {{item.name}} con un valor total de {{item.value}}</span>
      </div> -->
      <div v-if="items.length">
          <a-row type="flex">
            <a-col class="column-table-container" :span="6" :order="1"><h2 style="font-weight: bold;"> Producto </h2></a-col>
            <a-col class="column-table-container" :span="6" :order="2"><h2 style="font-weight: bold;"> Cantidad </h2></a-col>
            <a-col class="column-table-container" :span="6" :order="3"><h2 style="font-weight: bold;"> Total </h2></a-col>
            <a-col class="column-table-container" :span="6" :order="4"><h2 style="font-weight: bold;"> Opción </h2></a-col>
          </a-row>
          <a-row type="flex" v-for="(item, i) in items" :key="i">
            <a-col class="column-table-container" :span="6" :order="1"><h3>{{item.name}}</h3></a-col>
            <a-col class="column-table-container" :span="6" :order="2"><h3>{{item.quantity}}</h3></a-col>
            <a-col class="column-table-container" :span="6" :order="3"><h3>{{item.value}}</h3></a-col>
            <a-col class="column-table-container" :span="6" :order="4">
              <a-button type="primary" @click="deleteItem(item.id)" danger style="margin-right: 1rem;"><delete-outlined /></a-button>
            </a-col>
          </a-row>
        </div>
    </template>
  </div>
</template>
<script type="module" src="./js/ItemsSelectorComponent.js"/>
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
  .item-container{
    margin: 1rem; 
    padding: 1rem;  
    border: 1px solid black;
  }
  .span-text{
    font-size: 2em;
  }
  .column-table-container{
    padding-top: 1ex;
    padding-bottom: 1ex;
    text-align: center;
    border: 1px solid black;
  }
</style>