import axios from "axios";
import axiosRetry from "axios-retry";
import { API_CODE, API_METHOD } from "~/utils/const";
import LogUtil from "~/utils/LogUtil";
import JsCoreHelper from "~/utils/JsCoreHelper";
import LocalStorageHelper from "~/utils/LocalStorageHelper";

class BaseWebApi {
  constructor() {
    this.maxLogString = 2000;
    this.catchBadRequest = true;
    this.catchError = true;
    this.data = false;
    this.config = null;
    this.json = true;
  }

  async axiosProcess() {
    axiosRetry(axios, {
      retries: 3,
      retryCondition: (error) => {
        if(
          API_CODE.NotFoundError === error.response.status ||
          API_CODE.BadRequestError === error.response.status ||
          API_CODE.UnauthorizedError === error.response.status ||
          API_CODE.Forbidden === error.response.status
        ){
          return false
        }else{
          return true
        }
      }
    });
    let self = this
    let data = this.data
    if(data){
      if(data instanceof FormData){
        let keyNull = []
        for(const key of data.entries()){
          if(key[1] == 'null' || key[1]===null){
            keyNull.push(key[0])
          }
        }
        for(const i in keyNull){
          data.delete(keyNull[i])
        }
      }else{
        const keys = Object.keys(data)
        for(const i in keys){
            const key = keys[i]
            if(data[key] === null){
                delete data[key]
            }
        }
      }
    }
    
    
    axios.interceptors.request.use(requestConfig => {
      let token = LocalStorageHelper.get('access_token')
      requestConfig.headers = {
        Authorization: `Bearer ${token}`
      };
      
      if(self.json){
        requestConfig.headers['Accept'] = "application/json"
        requestConfig.headers['Content-Type'] = "application/json"
        data = JSON.stringify(data)
      }else{
        requestConfig.headers['Content-Type'] = "multipart/form-data"
      }
      return requestConfig;
    });
    // LogUtil.log("Call API: " +this.method +" "+ this.url);
    if (this.method === API_METHOD.GET) {
      return await axios.get(this.url, this.config);
    } else if (this.method === API_METHOD.POST) {
      return await axios.post(this.url, data, this.config);
    } else if (this.method === API_METHOD.DELETE) {
      return await axios.delete(this.url, this.config);
    } else if (this.method === API_METHOD.PUT) {
      return await axios.put(this.url, data, this.config);
    } else if (this.method === API_METHOD.PATCH) {
      return await axios.patch(this.url, data, this.config);
    } else {
      return null;
    }
  }

  async trigger() {
    try {
      const response = await this.axiosProcess();
      // LogUtil.log(content.substring(0,this.maxLogString));
      return response;
    } catch (e) {
      // const content = JSON.stringify(e);
      // LogUtil.log("ERROR API "+content.substring(0,this.maxLogString));
      if (API_CODE.UnauthorizedError === e?.response?.status) {
        return;
      }

      if(!this.catchError){
        return e?.response;
      }
      
      if (API_CODE.NotFoundError === e?.response?.status) {
        return e?.response;
      }
      if (this.catchBadRequest && API_CODE.BadRequestError === e?.response?.status) {
        const response = e.response
        if(response && response.data && response.data.errors){
          const errors = []
          for(const e_key in response.data.errors){
            errors[e_key] = response.data.errors[e_key].join("<br>")
          }
          response.data.errors = errors
          return response
        }
        return e?.response;
      }
      this.processError(e)
      return e?.response;
    }
  }

  processError(e){
    JsCoreHelper.showErrorMsg(e)
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setParameters(data, config) {
    this.config = config;
    this.data = data;
    return this;
  }

  setCatchBadRequest(value) {
    this.catchBadRequest = value;
    return this;
  }

  setCatchError(value) {
    this.catchError = value;
    return this;
  }

  setAttr(key, value){
    this[key] = value;
    return this;
  }

}

export default BaseWebApi;