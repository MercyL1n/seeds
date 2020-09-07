import { sendRequest } from '../index'

export default{
    disconnect: () => sendRequest('disconnect')
}