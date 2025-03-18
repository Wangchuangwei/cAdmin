export const getOptions = () => {
  let options = {
    formItem: {
      orgNo: '123',
    },
    itemsConfig: [
      {
        label: '机构编号',
        prop: 'orgNo',
        type: 'elInput',
        config: {
          props: {}
        }
      },
      {
        label: '机构编号',
        prop: 'orgNo12',
        type: 'elInput',
        config: {
          props: {}
        }
      },
      {
        label: '机构编号',
        prop: 'orgNo23',
        type: 'elInput',
        config: {
          props: {}
        }
      },
    ],
    formConfig: {
      cols: 3,
    }
  }
  return options
}