import {PlusCircleOutlined} from '@ant-design/icons-vue'
import axios from 'axios/index';
import AsyncHandler from './../../../../utils/AsyncHandler'
import { showSuccessMsg, showErrorMsg } from '../../../../components/utils/notification'
export default {
  data() {
    return {
      showError: false,
      error: 'Error',
      modalText: '',
      description: '',
      unity_value: null,
      visible: false,
      confirmLoading: false,
      disabled: false,
    }
  },
  components: {
    PlusCircleOutlined
  },
  methods: {
    showModal(){
      this.visible = true;
    },
    saveProduct(){
      AsyncHandler(saveProductHandler, this)
    },
    clearFields(){
      this.description = '';
      this.unity_value = 0;
    }

  },
}

async function saveProductHandler(component){
  component.disabled = true;
  if(!component.description || !component.unity_value){
    showErrorMsg('Por favor completar los campos')
    component.disabled = false;
    return
  }

  if(component.unity_value < 1){
    showErrorMsg('El valor unitario debe ser mayor que 0')
    component.disabled = false;
    return
  }


  let data = {
    description: component.description,
    unity_value: component.unity_value,
    stack: 0
  }
  const user_session = JSON.parse(localStorage.getItem('user_token'));
  let response = await axios.post(`${process.env.VUE_APP_URL_BASE_API}api/products`, data, {
    headers: { 
      'Authorization': `basic ${user_session.token}`
    }
  })

  if(response.data.status != 200){
    component.disabled = false; 
    showErrorMsg(response.data.error)
    return
  }
  
  showSuccessMsg(response.data.message)
  component.disabled = false;
  component.visible = false;
  component.clearFields()
  component.$emit('onProductCreated');


}