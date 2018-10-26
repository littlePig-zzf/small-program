import getClient from './index'

export const BASE_URL = 'https://mp.alaskamob.com'
export const API_URL = BASE_URL + '/api/1/'

export const api = {
  login: (data) => getClient('GET', 'login', data),
  main: {
    home: (data) => getClient('POST', 'home', data),
    step: (id) => getClient('POST', `step/${id}`),
    stepRecord: (page) => getClient('GET', 'step', page),
    bonus: () => getClient('POST', 'bonus')
  },
  user: {
    withdraw: () => getClient('POST', 'withdraw')
  }
}
