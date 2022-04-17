import {DeleteOutlined} from '@ant-design/icons-vue'
import AsyncHandler from './../../../../utils/AsyncHandler'
import CreateProductComponent from './../../../utils/Products/CreateProductComponent.vue'
import axios from 'axios/index';
import {showErrorMsg} from '../../notification/index'

export default {
  data() {
    return {
      itemId: null,
      itemAmount: null,
      itemValue: null,
      itemSelected: {},
      itemsResponse: [
      ],
      options: [
      ],
      items: [

      ]
    }
  },
  emits: ["onProductCreated"],
  components: {
    DeleteOutlined,
    'v-create-product' : CreateProductComponent
  },
  beforeMount() {
    AsyncHandler(getProdItems, this)
  },
  methods: {
    onChange(value){
      this.itemSelected = this.itemsResponse.find(e => e.id === value);
    },
    setItemsPreload(items){
      items.map((item) => {
        this.items.push({
          id: item.get_all_product.id,
          product_id: item.get_all_product.id,
          name: item.get_all_product.product_description,
          quantity: item.quantity,
          value: parseInt(item.total)
        })
      })
      
    },
    addItem(){
      let objData = this.inItemsArray(this.itemId);
      if(objData){
        this.deleteItem(objData.product_id);
        this.itemAmount += objData.quantity;
        this.itemValue += objData.value;
      }

      if(this.itemAmount < 1){
        showErrorMsg("La cantidad debe ser mayor a 0")
        return
      }

      this.items.push({
        id: this.itemId,
        product_id: this.itemId,
        name: this.itemSelected.product_description,
        quantity: this.itemAmount,
        value: this.itemValue
      })
      this.$emit('onTotal', this.getTotal())
      this.cleanFields();
    },
    getTotal(){
      let total = 0;
      this.items.forEach((v) => {
        total += v.value;
      })
      return total;
    },
    deleteItem(id){
      this.items = (this.items.filter((item) => item.product_id !== id))
      this.$emit('onTotal', this.getTotal())
    },
    onKeyupAmountInput(){
      this.itemValue = this.itemSelected.product_unity_value * this.itemAmount
    },
    cleanFields(){
      this.itemId = null;
      this.itemAmount = null;
      this.itemValue = null;
      this.itemSelected = {};
    },
    inItemsArray(id){
      let obj = this.items.find(e => e.product_id === id);
      if(!obj){
        return false;
      }
      return obj;
    },
    getItemsToCheckin(){
      return this.items;
    },
    onProductCreated(){
      AsyncHandler(getProdItems, this)
    },
    clearItemsTable(){
      this.items = [];
    }
  },
}

async function getProdItems(component){
  const user_session = JSON.parse(localStorage.getItem('user_token'));
  let response = await axios.get(`${process.env.VUE_APP_URL_BASE_API}api/products`, {
    headers: {
      'Authorization': 'basic '+ user_session.token
    }
  });
  const products = response.data.data;
  component.itemsResponse = products;
  component.options = products.map((v) => ({value: v.id, label: v.product_description}))
  
}