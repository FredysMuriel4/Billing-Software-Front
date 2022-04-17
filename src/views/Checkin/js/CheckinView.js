import HeaderComponent from './../../../components/utils/HeaderComponent.vue'
import AsyncHandler from './../../../utils/AsyncHandler'
import ItemsSelector from './../../../components/utils/Items/ItemsSelectorComponent.vue'
import { showSuccessMsg, showErrorMsg } from '../../../components/utils/notification'
import axios from 'axios/index';

export default {
  data() {
    return {
      vat: null,
      total_before_vat: null,
      total: null,
      items: [],
      transmitter: {
        name: '',
        nit: '',
      },
      receiver: {
        name: '',
        nit: '',
      },
      disabled:false
    }
  },
  components: {
    'v-header' : HeaderComponent,
    'v-item-selector' :ItemsSelector
  },
  methods: {
    checkin(){
      this.items = this.$refs.itemSelectorComponent.getItemsToCheckin()
      AsyncHandler(sendCheckin, this);
    },
    onTotal(total){
      this.total_before_vat = total;
      this.calculateVat()
    },
    calculateVat(){
      let percentage = (this.total_before_vat * this.vat) / 100;
      this.total = this.total_before_vat + percentage;
    },
    clearFields(){
      this.vat = null
      this.total_before_vat = null
      this.total = null
      this.$refs.itemSelectorComponent.clearItemsTable()
      this.transmitter = {
        name: '',
        nit: '',
      },
      this.receiver = {
        name: '',
        nit: '',
      }
    }
  },
}

async function sendCheckin(component){
  component.disabled = true;
  const user_session = JSON.parse(localStorage.getItem('user_token'));

  if(!component.transmitter.name || !component.transmitter.nit){
    showErrorMsg('Por favor rellenar los datos del Emisor');
    component.disabled = false;
    return
  }

  if(!component.receiver.name || !component.receiver.nit){
    showErrorMsg('Por favor rellenar los datos del Receptor');
    component.disabled = false;
    return
  }

  if(!component.items.length){
    showErrorMsg('Por favor agregue los Items de la factura');
    component.disabled = false;
    return
  }

  let data = {
    transmitter: component.transmitter,
    receiver: component.receiver,
    items: component.items,
    total_before_vat: component.total_before_vat,
    vat : component.vat,
    total : component.total
  }

  let response = await axios.post(`${process.env.VUE_APP_URL_BASE_API}api/invoices`, data, {
    headers: {
      'Authorization': `basic ${user_session.token}`
    }
  })

  if(response.data.status != 200){
    showErrorMsg(response.data.error)
    component.disabled=false;
    return
  }

  showSuccessMsg(response.data.message)
  component.clearFields();
  component.disabled=false;
}