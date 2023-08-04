// @ts-nocheck

/* ======== 接口名称 ======== */
// 1.设备管理
// 枚举设备列表 EnumDev
// 断开设备连接 DisConnect
// 2.访问控制
// 验证PIN VerifyPIN
// 修改用户PIN扩展 ChangePINEX
// 密钥导入管理 KEY格式化 KeyFormat
// 生成签名密钥对 GenECCKeyPair
// 导入用户加密密钥对 ImportECCKeyPair
// 导入数字证书 ImportECCCert
// 3.文件管理
// 枚举文件 EnumFiles
// 读文件 ReadFile
// 写文件 WriteFile
// 删除文件 DeleteFile
// 4.密码服务
// 产生随机数 GenRandom
// 数据摘要 SM3Digest
// 导出公钥 ExportPubKey
// 数字签名 ECCSign
// 验证签名 ECCVerify
// 私钥解密扩展 ECCDecryptEX
// 5.证书接口
// 导出数字证书 ExportCert
// 取证书公钥 GetCertPubKey 从证书数据中读取
// 取证书序列号 GetCertSNEX 从KEY中读取
// 取证书主题 GetCertSubjectEX 从KEY读取
// 6.其他  ECCResetUserPIN 重置用户PIN码

/* ======== websocket 方法 ======== */
/* websocket 五大方法
1.websocket.onopen
2.websocket.onmessage
3.websocket.onclose
4.websocket.onerror
5.websocket.send
*/
// @ts/nocheck

import { onBeforeUnmount } from 'vue'
import { Modal } from 'ant-design-vue'
import { websocketMsg } from '@packages/types/enums'
import { to, removeToken } from '@packages/utils'
import router from '@/router'

export interface SendParams {
  name: string // 方法名
  params?: {
    // 参数
    [key: string]: string
  }
}

export interface SockedConfig {
  url?: string
  notErrModules?: string[]
  socketErrShow?: boolean
  error?: (e: any) => void
  autoClose?: boolean
}

const defaultConfig: SockedConfig = {
  url: 'ws://127.0.0.1:10522',
  notErrModules: [],
  socketErrShow: true,
  autoClose: false
}

class WsFns {
  private readonly instance

  constructor(ws) {
    this.instance = ws
  }

  // @ts-ignore
  send(name, params) {
    // @ts-ignore
    this[name] && this[name](...params)
  }

  // 枚举设备列表
  EnumDev() {
    const req = '{"function":"EnumDev"}'
    this.instance.send(req)
  }

  // 断开设备连接 需要传一个参数设备id devID
  DisConnect(devID) {
    const req = `{"function":"DisConnect","devID":${devID}}`
    this.instance.send(req)
  }

  // 验证PIN 需要传两个参数 1.devID 设备id 2.userType 2为管理员 其他为默认用户
  VerifyPIN(devID, userType = 1) {
    const req = `{"function":"VerifyPIN","devID":"${devID}","userType":${userType}}`
    this.instance.send(req)
  }

  // 修改用户PIN扩展 需要传两个参数 1.devID 设备id 2.userType 2为管理员 其他为默认用户
  ChangePINEX(devID, userType) {
    const req = `{"function":"ChangePINEX","devID":"${devID}","userType":${userType}}`
    this.instance.send(req)
  }

  // 密钥导入管理 KEY格式化 需要传两个参数 1.devID 设备id flag:1当应用或容器存在时，先删除再创建；0，当应用或容器存在时，不允许删除。
  KeyFormat(devID, flag) {
    const req = `{"function":"KeyFormat","devID":"${devID}","flag":${flag}}`
    this.instance.send(req)
  }

  // 生成签名密钥对 GenECCKeyPair 需要传1个参数 1.devID
  GenECCKeyPair(devID) {
    const req = `{"function":"GenECCKeyPair","devID":"${devID}"}`
    this.instance.send(req)
  }

  // 导入用户加密密钥对 需要传三个参数 1.devID 设备id , 2.encEnvelopedKey base64编码的用户加密密钥对, 3.encEnvelopedKeyLen 可省略
  ImportECCKeyPair(devID, encEnvelopedKey, encEnvelopedKeyLen) {
    const req = `{"function":"ImportECCKeyPair","devID":"${devID}","encEnvelopedKey":"${encEnvelopedKey}"}`
    this.instance.send(req)
  }

  // 导入数字证书 需要传入四个参数 1.devID 设备id 2.certType  证书类型，1是签名，2是加密（0加密，1签名） 3. cert //base64编码的用户加密密钥对
  ImportECCCert(devID, certType, cert, certLen) {
    const req = `{"function":"ImportECCCert","devID":"${devID}","certType":${certType},"cert":"${cert}"}`
    this.instance.send(req)
  }

  /* ===========3.文件管理============ */

  // 枚举文件 需要传入一个参数 1.devID 设备id
  EnumFiles(devID) {
    const req = `{"function":"EnumFiles","devID":"${devID}"}`
    this.instance.send(req)
  }

  // 读文件 需要传入两个参数 1.devID 设备id 2. fileName 文件名称
  ReadFile(devID, fileName) {
    const req = `{"function":"ReadFile","devID":"${devID}","fileName":"${fileName}"}`
    this.instance.send(req)
  }

  // 写文件 需要传入三个参数 1.devID 设备id 2. fileName 文件名称 3.fileData (文件数据是可见字符或者base64编码数据) 4. 0表示文件的读权限为anyone，1表示文件的读权限为用户权限
  WriteFile(devID, fileName, fileData, fileRight) {
    const req = `{"function": "WriteFile","devID":"${devID}","fileName":"${fileName}","fileData":"${fileData}","fileRight":${fileRight}}`
    this.instance.send(req)
  }

  /* ===========4.产生随机数============ */

  // 产生随机数 需要传入三个参数 1.devID 设备id 2.randLen 随机数长度，无编码
  GenRandom(devID, randLen) {
    const req = `{"function":"GenRandom","devID":"${devID}","randLen":${randLen}}`
    this.instance.send(req)
  }

  // 数据摘要 需要传入两个参数 1.inData,2.inDataLen 最大长度20480
  SM3Digest(inData, inDataLen) {
    // const req = `{"function":"SM3Digest","inData":"${inData}","inDataLen":${inDataLen}}`
    const req = `{"function":"SM3Digest","inData":"${inData}"}`
    this.instance.send(req)
  }

  // 导出公钥 ExportPubKey 需要传入两个参数 1.devID 设备id 2.pubkeyType /1是签名，2是加密
  ExportPubKey(devID, pubkeyType) {
    const req = `{"function":"ExportPubKey","devID":"${devID}","pubkeyType":${pubkeyType}}`
    this.instance.send(req)
  }

  // 数字签名 需要传入两个参数 1.devID 设备id 2.inData//签名数据，函数内部做SM3摘要
  ECCSign(devID, inData, flag) {
    let req = ''
    if (flag !== undefined) {
      req = `{"function":"ECCSign","devID":"${devID}","inData":"${inData}","flag":${flag}}`
    } else {
      req = `{"function":"ECCSign","devID":"${devID}","inData":"${inData}"}`
    }
    this.instance.send(req)
  }

  // 数字签名 需要传入两个参数 1.devID 设备id 2.inData//签名数据，函数内部做SM3摘要
  ECCSignEx(devID, inData, flag) {
    let req = ''
    if (flag !== undefined) {
      req = `{"function":"ECCSignEx","devID":"${devID}","inData":"${inData}","flag":${flag}}` // 湖北
    } else {
      req = `{"function":"ECCSignEx","devID":"${devID}","inData":"${inData}"}`
    }
    this.instance.send(req)
  }

  // 验证签名 ECCVerify 需要传4个参数
  // 1.devID 设备id 2."publicKey": base64编码外来公钥 3."inData": 待验证签名数据，函数内部做摘要处理,4.signedData":base64编码的待验证的签名值
  ECCVerify(devID, publicKey, inData, signedData) {
    const req = `{"function":"ECCVerify","devID":"${devID}","publicKey":"${publicKey}","inData":"${inData}","signedData":"${signedData}"}`
    this.instance.send(req)
  }

  // 私钥解密扩展 ECCDecryptEX
  // 需要传四个参数 1.devID 设备id ,2.encryptedData base64编码的密文数据, 3.encryptedDataLen,4.flag 111为修改设备认证码为服务器返回的值，其他保持不变
  ECCDecryptEX(devID, encryptedData, flag) {
    const req = `{"function":"ECCDecryptEX", "devID":"${devID}", "encryptedData":"${encryptedData}", "flag":${flag}}`
    this.instance.send(req)
  }

  // 私钥解密ECCDecrypt
  // isEncode: 0是不需要编码，1是base64编码
  ECCDecrypt(devID, encryptedData, isEncode) {
    const req = `{"function":"ECCDecrypt", "devID":"${devID}", "encryptedData":"${encryptedData}", "isEncode":${isEncode}}`
    InterceptorSend(this.websocket, req, this.isConnect())
  }

  /* ===========5.证书接口============ */

  // 导出数字证书 需要传两个参数  1."devID":设备id，2."certType" 1是签名，2是加密
  ExportCert(devID, certType) {
    const req = `{"function":"ExportCert","certType":${certType},"devID":"${devID}"}`
    this.instance.send(req)
  }

  // 取证书公钥  从证书数据中读取 需要传一个参数 1."cert": base64编码的证书
  GetCertPubKey(cert) {
    const req = `{"function":"GetCertPubKey","cert":"${cert}"}`
    this.instance.send(req)
  }

  // 取证书序列号  从KEY中读取 需要传两个参数  1.devID 设备id 2. certType：1是签名，2是加密
  GetCertSNEX(devID, certType) {
    const req = `{"function":"GetCertSNEX","devID":"${devID}","certType":${certType}}`
    this.instance.send(req)
  }

  // 取证书主题  从KEY读取 需要传两个参数  1.devID 设备id 2. certType：1是签名，2是加密
  GetCertSubjectEX(devID, certType) {
    const req = `{"function":"GetCertSubjectEX","devID":${devID},"certType":${certType}}`
    this.instance.send(req)
  }

  /* ===========6.其他============ */

  // 重置用户PIN码 需要传 1."devID":设备id,2."resetData" 3."resetDataLen" 4."flag":valueint//111为修改设备认证码为服务器返回的值，985修改为出厂值，其他保持不变
  ECCResetUserPIN(devID, resetData, flag) {
    const req = `{"function":"ECCResetUserPIN","devID":"${devID}","resetData":"${resetData}","flag":${flag}}`
    this.instance.send(req)
  }

  /* ===========7.对称解密(20181123日新增)============ */
  ECCSymcEncryptEX(devID, encFile, dataSymKeyEnc) {
    // 需要传 1."devID":设备id, 2."encFile" :密文数据, 3."dataSymKeyEnc":
    const req = `{"function":"ECCSymcEncryptEX","devID":"${devID}","encFile":"${encFile}","dataSymKeyEnc":"${dataSymKeyEnc}"}`
    this.instance.send(req)
  }

  // 删除文件
  DeleteFile(devID, fileName) {
    // 需要传 1."devID":设备id, 2."encFile" :密文数据, 3."dataSymKeyEnc":
    const req = `{"function":"DeleteFile","devID":"${devID}","fileName":"${fileName}"}`
    this.instance.send(req)
  }

  ChangePIN(devID, userType, flag) {
    const req = `{"function":"ChangePINEX","devID":"${devID}","userType":${userType},"flag":${flag}}`
    this.instance.send(req)
  }

  // 外来公钥加密：使用外来公钥对输入数据做加密运算并输出结果，明文数据长度小于128字节，加密算法默认是SGD_SM2_3
  // 需要传 1.devID:设备id, 2.publicKey:base64编码的外来公钥 3.plainData:明文数据
  ExtECCEncrypt(devID, publicKey, plainData) {
    const req = `{"function":"ExtECCEncrypt","devID":"${devID}","publicKey":"${publicKey}","plainData":"${plainData}"}`
    this.instance.send(req)
  }

  // 获取印章数据
  // eslint-disable-next-line camelcase
  WS_GetSealData() {
    const req = '{"function":"WS_GetSealData"}'
    this.instance.send(req)
  }

  // eslint-disable-next-line camelcase
  WS_GetSealImage() {
    const req = '{"function":"WS_GetSealImage"}'
    this.instance.send(req)
  }

  GetSoftwareVersion() {
    const req = '{"function":"GetSoftwareVersion"}'
    this.instance.send(req)
  }
}

class MySocket {
  private url
  private ws
  private methods
  private globalErr
  private config: SockedConfig

  constructor(url: string, globalErr: SockedConfig.error) {
    this.url = url
    this.ws = null
    this.methods = null
    this.globalErr = globalErr
    this.config = {
      ...defaultConfig
    }
  }

  static getInstance(...args) {
    if (!MySocket.instance) {
      MySocket.instance = new MySocket(...args)
    }
    return MySocket.instance
  }

  isConnect() {
    if (!this.ws || this.ws.readyState === 3) {
      return false
    } else if (this.ws.readyState !== 1) {
      return false
    }
    return true
  }

  logout(key = 'deviceOut') {
    this.config.socketErrShow &&
      message.error({
        content: websocketMsg[key],
        duration: 4
      })
    removeToken()
    router.push('/login')
  }

  onmessage() {
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.function === 'DeviceOut') {
        this.logout('deviceOut')
      }
      if (data.result !== 0 && data.err.includes('0x0a00002d')) {
        this.logout('timeOut')
      }
    }
  }

  error() {
    this.ws.addEventListener('error', e => {
      console.log('websocket__err', e)
      this.globalErr && this.globalErr(e)
      this.config.socketErrShow &&
        Modal.error({
          title: websocketMsg.errTitle,
          content: websocketMsg.socketCloseErr
        })
    })
  }

  open(config: SockedConfig) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    this.config = config
    if ('WebSocket' in window) {
      // use singleton instance
      if (this.ws) {
        return new Promise(resolve => {
          resolve(true)
        })
      }
      this.ws = new WebSocket(this.url)
      this.error()
      return new Promise(resolve => {
        _this.ws.addEventListener('open', () => {
          _this.methods = new WsFns(_this.ws)
          resolve(true)
        })
      })
    } else {
      this.config.socketErrShow &&
        Modal.error({
          title: websocketMsg.errTitle,
          content: websocketMsg.notSupport
        })
    }
  }

  close() {
    this.ws && this.ws.close && this.ws.close()
    this.ws = null
  }

  send(name: string, params?: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    const { notErrModules, socketErrShow } = this.config

    return new Promise((resolve, reject) => {
      function message(e) {
        const newData = JSON.parse(e.data)
        if (newData.function === name && parseInt(newData.result) === 0) {
          _this.ws.removeEventListener('message', message)
          resolve(newData)
        }
        if (parseInt(newData.result) !== 0) {
          if (name !== 'DeleteFile') {
            _this.ws.removeEventListener('message', message)
            reject(newData)
            if (!(notErrModules as string[]).includes(newData.function)) {
              socketErrShow &&
                Modal.error({
                  title: websocketMsg.errTitle,
                  content: newData.err
                })
            }
          }
        }
      }

      if (_this.isConnect()) {
        _this.ws.addEventListener('message', message)
        _this.methods.send(name, params)
      } else {
        console.log('isConnect__err')
        socketErrShow &&
          Modal.error({
            title: websocketMsg.errTitle,
            content: websocketMsg.socketCloseErr
          })
      }
    })
  }
}

export default function socket(config?: SockedConfig) {
  const defaultProps: SockedConfig = {
    ...defaultConfig,
    ...config
  }
  ;(defaultProps.notErrModules as string[]).push('DeleteFile')
  // const ws = new MySocket(defaultProps.url as string, defaultProps.error)
  // use singleton pattern
  const ws = MySocket.getInstance(defaultProps.url as string, defaultProps.error)
  if (defaultProps.autoClose) {
    onBeforeUnmount(() => {
      ws.close()
    })
  }

  async function open() {
    const [err, res] = await to(ws.open(defaultProps))
    if (err) {
      defaultProps.error && defaultProps.error(err)
      return [err, null]
    }
    return [null, null]
    // 获取版本号
    // const [err2, result2] = await send('GetSoftwareVersion')
    // if (err2) {
    //   defaultProps.error && defaultProps.error(err2)
    //   return [err2, null]
    // }
    // const version = parseInt(result2.version.replace(/[^0-9]/gi, ''))
    // console.log(version)
    // if (version >= 1361) {
    //   return [null, version]
    // } else {
    //   config?.socketErrShow &&
    //     Modal.error({
    //       title: websocketMsg.errTitle,
    //       content: websocketMsg.VersionErr
    //     })
    //   return [true, null]
    // }
  }

  async function send(name, ...params) {
    const [err, res] = await to(ws.send(name, params))
    if (err) {
      defaultProps.error && defaultProps.error(err)
    }
    return [err, res]
  }

  return {
    open,
    send: send.bind(ws),
    close: ws.close.bind(ws),
    ws
  }
}
