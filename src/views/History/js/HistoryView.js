import HeaderComponent from './../../../components/utils/HeaderComponent.vue'
import AsyncHandler from './../../../utils/AsyncHandler'
import axios from 'axios/index';
import {showErrorMsg} from './../../../components/utils/notification'
import {FormOutlined, SelectOutlined, FileSearchOutlined, SearchOutlined} from '@ant-design/icons-vue'

export default {
  data() {
    return {
      order: "asc",
      query: '',
      orderOptions: [
        {value: 'asc', label: 'Ascendente'},
        {value: 'desc', label: 'Descendente'},
      ],
      invoicesData: [],
      loading: false
    }
  },
  beforeMount(){
    AsyncHandler(getInvoicesHandler, this)
  },
  components: {
    'v-header' :HeaderComponent,
    FormOutlined,
    SelectOutlined,
    FileSearchOutlined,
    SearchOutlined
  },
  methods: {
    onChangeOrder(){
      AsyncHandler(getInvoicesQueryHandler, this)
    },
    getInvoices(){
      AsyncHandler(getInvoicesHandler, this)
    },
    goToShow(id){
      this.$router.push({path: '/invoiceData', query: {id, type: 'show'}})
    },
    goToEdit(id){
      this.$router.push({path: '/invoiceData', query: {id, type: 'edit'}})
    }
  }
}

async function getInvoicesHandler(component){
  component.loading = true;
  const user_session = JSON.parse(localStorage.getItem('user_token'));
  let response = await axios.get(`${process.env.VUE_APP_URL_BASE_API}api/invoices`, {
    headers: {
      'Authorization': `basic ${user_session.token}`
    }
  })

  if(response.data.status != 200) {
    showErrorMsg(response.data.error)
    component.loading = false;
    return
  }

  component.invoicesData = response.data.data;
  component.loading = false;
  
}

async function getInvoicesQueryHandler(component){
  component.loading = true;
  const user_session = JSON.parse(localStorage.getItem('user_token'));
  let response = await axios.get(`${process.env.VUE_APP_URL_BASE_API}api/invoices?query=${component.query}&order=${component.order}`, {
    headers: {
      'Authorization': `basic ${user_session.token}`
    }
  })

  if(response.data.status != 200) {
    showErrorMsg(response.data.error)
    component.loading = false;
    return
  }

  component.invoicesData = response.data.data;
  component.loading = false;
  
}

