import axios from 'axios'
import humps from 'humps'

export default function ({ $axios }) {
  $axios.defaults.transformResponse = [].concat(
    axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  )
}
