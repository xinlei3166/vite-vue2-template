import { reactive } from 'vue'
import { message, Modal } from 'ant-design-vue'
import useSocket from './socket'
import { httpMsg } from '@packages/types/enums'

export const useUKey = () => {
  const { open, send } = useSocket()

  const state = reactive<any>({
    loading: false,
    devList: [],
    devID: undefined,
    publicKey: undefined,
    signCert: undefined,
    encCert: undefined,
    envelopedEncKeyPair: undefined,
    systemPubKey: undefined,
    signedData: undefined
  })
  const getDevId = async () => {
    const [openErr] = await open()
    if (openErr) {
      state.loading = false
      message.error('WebSocket连接失败')
      return
    }
    // 获取设备
    const [devErr, devData] = await send('EnumDev')
    if (devErr) {
      state.loading = false
      message.error('获取UKey设备信息失败')
      return
    }
    state.devList = devData.devList || []
    if (state.devList.length <= 0) {
      state.loading = false
      message.error(
        '未检查到UKey，可能存在以下情况：1、未插入UKey；2、UKey可能损坏；3、UKey插入的USB口可能损坏；'
      )
      return
    }
    if (state.devList.length > 1) {
      state.loading = false
      message.error('请插入一个UKey设备')
      return
    }
    state.devID = state.devList[0].devID
    return true
  }

  const getPublicKey = async () => {
    const [pubKeyErr, pubKeyData] = await send('ExportPubKey', state.devID, 1)
    console.log('pubKeyErr', pubKeyErr, pubKeyData)
    const publicKey = pubKeyData.publicKey
    if (pubKeyErr || pubKeyData.result !== 0 || !publicKey) {
      state.loading = false
      message.error('获取Ukey公钥失败')
      return
    }
    state.publicKey = publicKey
    return true
  }

  const verifyPIN = async () => {
    const [pinErr, pinData] = await send('VerifyPIN', state.devID, 1)
    console.log('pinErr', pinErr, pinData)
    if (pinErr) {
      state.loading = false
      message.error('验证PIN失败')
      return
    }
    return true
  }

  const exportCert = async (key: string) => {
    const [certErr, certData] = await send('ExportCert', state.devID, 1)
    console.log('certErr', certErr, certData)
    if (certErr) {
      state.loading = false
      message.error('导出证书失败')
      return
    }
    state[key] = certData.cert
    return true
  }

  const reckonECCSign = async (initData: any) => {
    const [reckonECCSignErr, reckonECCSignData] = await send('ECCSign', state.devID, initData)
    if (reckonECCSignErr) {
      state.loading = false
      message.error('计算签名失败')
      return
    }
    state.signedData = reckonECCSignData.signedData
    return true
  }

  const genECCKeyPair = async () => {
    const [gekpErr, gekpData] = await send('GenECCKeyPair', state.devID)
    console.log('gekpErr', gekpErr, gekpData)
    if (gekpErr) {
      state.loading = false
      message.error('生成签名密钥对失败')
      return
    }
    return true
  }

  const importECCKeyPair = async () => {
    // 导入用户加密密钥对
    const [err] = await send('ImportECCKeyPair', state.devID, state.envelopedEncKeyPair)
    if (err) {
      state.loading = false
      message.error('导入用户加密密钥对失败')
      return
    }
    return true
  }

  const importECCCert = async () => {
    // 导入数字证书 需要传入四个参数 1.devID 设备id 2.certType  证书类型，1是签名，2是加密 3.cert //base64编码的用户加密密钥对
    const [err1] = await send('ImportECCCert', state.devID, 1, state.signCert)
    const [err2] = await send('ImportECCCert', state.devID, 0, state.encCert)
    if (err1 || err2) {
      state.loading = false
      message.error('导入数字证书失败')
      return
    }
    return true
  }

  const eccDecrypt = async (
    encryptedData: string,
    isEncode = 0,
    key: string,
    msg = '私钥解密失败'
  ) => {
    const [err, res] = await send('ECCDecrypt', state.devID, 1, encryptedData, isEncode)
    if (err) {
      state.loading = false
      message.error(msg)
      return
    }
    state[key] = res.plainData
    return true
  }

  const genRandom = async (randLen: number, key: string, msg = '生成随机数失败') => {
    const [err, res] = await send('GenRandom', state.devID, randLen)
    if (err) {
      state.loading = false
      message.error(msg)
      return
    }
    state[key] = res.randData
    return true
  }

  const sm3Digest = async (key: string, value: string, msg = '数据摘要失败') => {
    const [err, res] = await send('SM3Digest', value)
    if (err) {
      state.loading = false
      message.error(msg)
      return
    }
    state[key] = res.digestedData
    return true
  }

  const writeFile = async (key: string, value: string, msg = '文件写入失败') => {
    const [err, res] = await send('WriteFile', state.devID, key, value, 1)
    console.log('WriteFile', err, res)
    if (err) {
      state.loading = false
      message.error(msg)
      return
    }
    return true
  }

  const readFile = async (fileName: string, key: string, msg = '文件读取失败') => {
    const [err, res] = await send('ReadFile', state.devID, fileName)
    console.log('ReadFile', err, res)
    if (err) {
      state.loading = false
      message.error(msg)
      return
    }
    state[key] = res.fileData
    return true
  }

  return {
    state,
    getDevId,
    verifyPIN,
    exportCert,
    genECCKeyPair,
    getPublicKey,
    importECCKeyPair,
    importECCCert,
    eccDecrypt,
    genRandom,
    sm3Digest,
    writeFile,
    readFile,
    reckonECCSign
  }
}
