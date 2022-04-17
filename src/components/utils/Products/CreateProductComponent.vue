<template>
    <a-button type="primary" @click="showModal"><plus-circle-outlined /></a-button>
    <a-modal
      v-model:visible="visible"
      title="Crear producto"
      :confirm-loading="confirmLoading"
      :okButtonProps="{disabled}"
      okText="Guardar"
      @ok="saveProduct"
    >
    <a-row justify="space-between">
      <a-col :span="11">
        <a-input v-model:value="description" placeholder="Nombre" />
      </a-col>
      <a-col :span="11">
        <a-input v-model:value="unity_value" placeholder="Valor unitario" />
      </a-col>
    </a-row>
      <p v-if="showError" class="error-msg">{{error}}</p>
    </a-modal>
</template>
<script type="module" src="./js/CreateProductComponent.js"/>
<style scoped>
  .error-msg{
    margin-top: 1rem;
    color: red;
  }
</style>