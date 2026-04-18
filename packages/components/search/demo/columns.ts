import { ref, reactive } from 'vue'

export interface Options {
  label: string
  value: any
}

export const searchColumns = [
  {
    label: '姓名',
    searchType: 'input',
    type: 'text',
    key: 'name1',
    props: {
      placeholder: '请输入姓名'
    }
  },
  {
    label: '年龄',
    searchType: 'input-number',
    key: 'name2',
    props: {
      placeholder: '请输入年龄'
    }
  },
  {
    label: '爱好',
    searchType: 'select',
    key: 'name3',
    props: {
      options: {
        1: '玩游戏',
        2: '听音乐'
      },
      placeholder: '请选择爱好'
    }
  },
  {
    label: '国籍',
    searchType: 'select',
    key: 'name4',
    props: {
      options: [{ label: '中国', value: 'china' }],
      placeholder: '请选择城市'
    }
  },
  {
    label: '省市区',
    searchType: 'tree-select',
    key: 'name5',
    props: {
      data: [
        {
          title: '北京',
          value: 'bj',
          key: 'bj',
          children: [
            {
              title: '北京市',
              value: 'bjs',
              key: 'bjs',
              children: [
                {
                  title: '东城区',
                  value: 'dcq',
                  key: 'dcq'
                },
                {
                  title: '西城区',
                  value: 'xcq',
                  key: 'xcq'
                }
              ]
            }
          ]
        }
      ],
      checkable: false,
      checkStrictly: false,
      expandAll: false,
      placeholder: '请选择省市区'
    }
  },
  {
    label: '性别',
    key: 'name6',
    slot: 'name6'
  },
  {
    label: '食物',
    searchType: 'cascader',
    key: 'name7',
    props: {
      options: [
        {
          value: 'chaocai',
          label: '炒菜',
          children: [
            {
              value: 'gaifan',
              label: '盖饭',
              children: [
                {
                  value: 'hongshaoroufan',
                  label: '红烧肉饭'
                }
              ]
            }
          ]
        }
      ],
      placeholder: '请选择食物'
    }
  },
  {
    class: 'search-item-name5',
    searchType: 'select',
    labelWidth: 0,
    key: 'name8',
    props: {
      keys: { label: 'name', value: 'id' },
      options: [
        { name: '微辣', id: 1 },
        { name: '中辣', id: 2 },
        { name: '特辣', id: 3 }
      ],
      placeholder: '请选择辣度'
    }
  },
  {
    label: '生日',
    searchType: 'date-picker',
    key: 'name9',
    props: {
      placeholder: '请选择生日'
    }
  },
  {
    label: '日期',
    searchType: 'range-picker',
    key: 'name10',
    props: {
      placeholder: ['开始日期', '结束日期']
    }
  }
]

export const tableColumns = [
  {
    title: 'ID',
    colKey: 'id',
    fixed: 'left'
  },
  {
    title: '姓名',
    fixed: 'left'
  },
  {
    title: '年龄',
    colKey: 'age'
  },
  {
    title: '爱好',
    colKey: 'hobby'
  },
  {
    title: '手机号码',
    colKey: 'phone'
  },
  {
    title: '邮箱',
    colKey: 'email'
  },
  {
    title: '更新时间',
    colKey: 'updateTime'
  },
  {
    title: '操作',
    colKey: 'operation',
    fixed: 'right',
    scopedSlots: { customRender: 'operation' }
  }
]
