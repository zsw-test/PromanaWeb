import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie';
import router from '@/router';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// create an axios instance
const service = axios.create({
   baseURL: "http://127.0.0.1:31717", // url = base url + request url
  // // withCredentials: true, // send cookies when cross-domain requests
   timeout: 5000, // request timeout
  withCredentials: true // 允许携带cookie
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

 
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Token'] = localStorage.getItem('token')
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response)
    const res = response
    
    if(res.data.code===401){
      Message("长时间未操作，请重新登录！")
      router.push('/login')
      return
    }else if (res.data.code===402){
      Message("登陆超时 ~请重新登陆！")
      router.push('/login')
      return 
    }
    return response
  },
  //   // if the custom code is not 20000, it is judged as an error.
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message || 'Error',
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
    
  //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // to re-login
  //       MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
  //         confirmButtonText: 'Re-Login',
  //         cancelButtonText: 'Cancel',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('user/resetToken').then(() => {
  //           location.reload()
  //         })
  //       })
  //     }
  //     return Promise.reject(new Error(res.message || 'Error'))
  //   } else {
  //     return res
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
