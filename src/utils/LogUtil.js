import LocalStorageHelper from '~/utils/LocalStorageHelper'
import { LOCAL_STORAGE_KEY } from '~/utils/const'

export const LogUtil = {
  logs: [],
  log(content) {
    if (process.env.envApi !== 'prd') {
      // console.log(content)
      let logs = LocalStorageHelper.getObject('logs', [])
      if(logs.length > 200){
        logs = []
      }
      logs.push(content)
      LocalStorageHelper.setObject('logs', logs)
    }
  },
  getLogs() {
    return LocalStorageHelper.getObject('logs', [])
  }
}

export default LogUtil
