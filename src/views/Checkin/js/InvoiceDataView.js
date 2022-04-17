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
      items: [

      ],
      transmitter: {
        name: '',
        nit: '',
      },
      receiver: {
        name: '',
        nit: '',
      },
      disabled:false,
      data: [],
      noEditables: false,
      loading: false
    }
  },
  emits: ['onTotal'],
  components: {
    'v-header' : HeaderComponent,
    'v-item-selector' :ItemsSelector
  },
  mounted(){
    this.$route.query.type == 'edit' ? this.noEditables = false : this.noEditables = true;
    AsyncHandler(getInvoicesDataHandler, this)
  },
  methods: {
    checkin(){
      this.items = this.$refs.itemSelectorComponent.getItemsToCheckin()
      AsyncHandler(updateCheckin, this);
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
    },
    fillFields(data){
      this.transmitter.name = data.get_all_transmitter.name;
      this.transmitter.nit = data.get_all_transmitter.nit;
      this.receiver.name = data.get_all_receiver.name;
      this.receiver.nit = data.get_all_receiver.nit;
      this.vat = data.invoice_vat;
      this.total_before_vat = data.invoice_value_before_vat;
      this.total = data.invoice_total_value;
      this.items = data.get_all_items;
      if(this.$route.query.type === 'edit'){
        this.$refs.itemSelectorComponent.setItemsPreload(this.items);
      }
      
    }
  },
}

async function getInvoicesDataHandler(component){
  component.loading = true;
  const user_session = JSON.parse(localStorage.getItem('user_token'));

  let response = await axios.get(`${process.env.VUE_APP_URL_BASE_API}api/invoices/${component.$route.query.id}/edit`, {
    headers: {
      'Authorization': `basic ${user_session.token}`
    }
  })
  component.fillFields(response.data.data);
  component.loading = false;
}

async function updateCheckin(component){
  component.loading = true;
  component.disabled = true;
  const user_session = JSON.parse(localStorage.getItem('user_token'));

  if(!component.transmitter.name || !component.transmitter.nit){
    showErrorMsg('Por favor rellenar los datos del Emisor');
    component.disabled = false;
    component.loading = false;
    return
  }

  if(!component.receiver.name || !component.receiver.nit){
    showErrorMsg('Por favor rellenar los datos del Receptor');
    component.disabled = false;
    component.loading = false;
    return
  }

  if(!component.items.length){
    showErrorMsg('Por favor agregue los Items de la factura');
    component.disabled = false;
    component.loading = false;
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

  let response = await axios.put(`${process.env.VUE_APP_URL_BASE_API}api/invoices/${component.$route.query.id}`, data, {
    headers: {
      'Authorization': `basic ${user_session.token}`
    }
  })

  if(response.data.status != 200){
    showErrorMsg(response.data.error)
    component.disabled=false;
    component.loading = false;
    return
  }

  showSuccessMsg(response.data.message)
  component.clearFields();
  await getInvoicesDataHandler(component)
  component.disabled=false;
  component.loading = false;
}