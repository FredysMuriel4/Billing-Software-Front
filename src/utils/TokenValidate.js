import axios from 'axios/index'

export default async function TokenValidate(component) {
  let user_session = JSON.parse(localStorage.getItem('user_token'))
  let response = await axios.post(`${process.env.VUE_APP_URL_BASE_API}api/token-validate`,{}, {
    headers: {
      'Authorization': `basic ${user_session ? user_session.token : 'token'}`
    }
  });
  if(response.data.status == 401 && component.$route.name !== 'Login'){
    await axios.post(`${process.env.VUE_APP_URL_BASE_API}api/log-out`, { 
      headers: {
        'Authorization': `basic ${user_session ? user_session.token : 'token'}`
      }
    })

    localStorage.clear()
    component.$router.push('/login')
  }

  return true;

}

