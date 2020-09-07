import { sendRequest } from '../index'

export default{
  getFilePreview: () => sendRequest('getFilePreview'),
  transFile: path => sendRequest('transFile', {filepath: '/User/flag'})
}
