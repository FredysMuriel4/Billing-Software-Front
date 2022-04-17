import HeaderComponent from './../../../../components/utils/HeaderWithoutLoginComponent.vue'
import AsyncHandler from './../../../../utils/AsyncHandler'
import { RightCircleOutlined } from '@ant-design/icons-vue';
import axios from 'axios/index';
import { notification } from 'ant-design-vue';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

export default {
  data() {
    return {
      nit: '00000000',
      password: 'secret',
      error: false,
      errorMsg: 'Complete los campos'
    }
  },
  components: {
    'v-header-without-login' :HeaderComponent,
    RightCircleOutlined
  },
  methods: {
    onLogin() {
      AsyncHandler(login, this)
    },
    showSuccessMsg(){
      notification.open({
        message: 'Ha accedido al software de Facturación',
        duration: 2,
        icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
        placement: 'bottomRight'
      });
    },
    showErrorMsg(){
      notification.open({
        message: this.errorMsg,
        duration: 5,
        icon: () => h(FrownOutlined, { style: 'color: red' }),
        placement: 'bottomRight'
      });
    }
  },
}

//Funciones que son externas y Asyncronas

async function login (component){
  let data = {
    nit: component.nit,
    password: component.password
  }

  /* localStorage.setItem("user_token", JSON.stringify(data));
  component.showSuccessMsg();
  component.$router.push('/'); */

  if(!data.nit || !data.password){
    component.showErrorMsg();
    return
  }

  let response = await axios.post(`${process.env.VUE_APP_URL_BASE_API}api/login`, data);

  if(response.data.status === 400){
    component.errorMsg = response.data.message;
    component.showErrorMsg();
    component.error = true;
    return 
  }

  if(response.data.status === 200){
    //response.data.data
    let localdata = { 
      nit: component.nit,
      role: "Administrator",
      token: response.data.data
     }

    localStorage.setItem("user_token", JSON.stringify(localdata));
    component.showSuccessMsg();
    component.$router.push('/');

  }
}