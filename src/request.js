import axios from 'axios'

export default {
  get (params) {
    const config = {
      url: '/indicadorbrutofinal/pretratamento',
      baseURL: 'http://192.168.0.18:30130/api',
      params
    }
    return axios(config).then(({data}) => {
      const { Page, PageCount, ItemsPerPage, Result } = data
      return { Page, PageCount, ItemsPerPage, Result: Result.map(({ CicloLevantamentoIndicadorId, SafraId, IndicadorNome, SafraDescricao}) => ({ id: `${CicloLevantamentoIndicadorId}${SafraId}`, text: `${IndicadorNome}`, selected: false}))}
    })
  }
}
