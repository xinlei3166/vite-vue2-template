import { Button } from 'tdesign-vue'
import { useRouter } from 'vue-router/composables'

export default function Buttons() {
  const router = useRouter()

  const onGoHome = () => {
    router.push('/')
  }

  return (
    <Button theme="primary" onClick={onGoHome}>
      回到首页
    </Button>
  )
}
