import api from './api'

export default function installHttp(app) {
  app.config.globalProperties.$http = api
}