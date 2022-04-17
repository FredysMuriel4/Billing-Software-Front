import { notification } from 'ant-design-vue';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

export function showSuccessMsg(msg){
  notification.open({
    message: msg,
    duration: 2,
    icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
    placement: 'bottomRight'
  });
}
export function showErrorMsg(msg){
  notification.open({
    message: msg,
    duration: 2,
    icon: () => h(FrownOutlined, { style: 'color: red' }),
    placement: 'bottomRight'
  });
}
