import {
  ConfigProvider,
  Menu,
  Button,
  Card,
  Form,
  FormModel,
  Select,
  Input,
  Breadcrumb,
  Dropdown,
  Layout,
  Table,
  Drawer,
  Switch,
  Upload,
  Modal,
  TreeSelect,
  DatePicker,
  Cascader,
  Radio,
  Tabs,
  Rate,
  InputNumber,
  Tag,
  Popconfirm,
  Alert,
  Spin,
  Popover,
  Empty,
  Avatar,
  Tooltip,
  Row,
  Col,
  Badge,
  Steps,
  Timeline,
  Result,
  Pagination,
  Checkbox,
  Transfer,
  Divider,
  Tree,
  Statistic
} from 'ant-design-vue'

export const components = [
  ConfigProvider,
  Menu,
  Button,
  Card,
  FormModel,
  Select,
  Input,
  Breadcrumb,
  Dropdown,
  Layout,
  Table,
  Drawer,
  Switch,
  Upload,
  Modal,
  TreeSelect,
  DatePicker,
  Cascader,
  Radio,
  Tabs,
  Rate,
  InputNumber,
  Tag,
  Popconfirm,
  Alert,
  Spin,
  Popover,
  Empty,
  Avatar,
  Tooltip,
  Row,
  Col,
  Badge,
  Steps,
  Timeline,
  Result,
  Pagination,
  Checkbox,
  Transfer,
  Divider,
  Tree,
  Statistic
]

export default {
  install: (app: any) => {
    components.forEach(component => {
      app.use(component)
      app.component(Form.name, FormModel)
      app.component(Form.Item.name, FormModel.Item)
    })
  }
}