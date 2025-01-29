/* eslint-disable react/prop-types */

import { useParams } from 'react-router'
import { Table, Space, Form, Input } from 'antd'
import {
  useTable,
  List,
  Create,
  Edit,
  Show,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  useForm,
} from '@refinedev/antd'

const SupplierForm = ({ formProps }) => {
  return (
    <Form {...formProps} layout='vertical'>
      <Form.Item
        label='Nama'
        name={['nama_supplier']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Alamat'
        name={['alamat_supplier']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='No Telepon'
        name={['no_telepon']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export const SupplierList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  })

  return (
    <List title='Supplier'>
      <Table {...tableProps} rowKey='id_supplier'>
        <Table.Column dataIndex='id_supplier' title='ID' />
        <Table.Column dataIndex='nama_supplier' title='Nama' />
        <Table.Column dataIndex='alamat_supplier' title='Alamat' />
        <Table.Column dataIndex='no_telepon' title='No Telepon' />
        <Table.Column
          dataIndex={['created_at']}
          title='Created At'
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          title='Actions'
          dataIndex='actions'
          render={(_, record) => (
            <Space>
              <EditButton
                hideText
                size='small'
                recordItemId={record.id_supplier}
                meta={{ id_supplier: record.id_supplier }}
              />
              <ShowButton
                hideText
                size='small'
                recordItemId={record.id_supplier}
                meta={{ id_supplier: record.id_supplier }}
              />
              <DeleteButton
                hideText
                size='small'
                recordItemId={record.id_supplier}
                meta={{
                  idColumnName: 'id_supplier',
                  id_supplier: record.id_supplier,
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}

export const SupplierCreate = () => {
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <SupplierForm formProps={formProps} />
    </Create>
  )
}

export const SupplierEdit = () => {
  const { id_supplier } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_supplier,
    queryMeta: {
      idColumnName: 'id_supplier',
    },
    mutationMeta: {
      idColumnName: 'id_supplier',
    },
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <SupplierForm formProps={formProps} />
    </Edit>
  )
}

export const SupplierShow = () => {
  const { id_supplier } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_supplier,
    queryMeta: {
      idColumnName: 'id_supplier',
    },
  })

  return (
    <Show saveButtonProps={saveButtonProps}>
      <SupplierForm formProps={formProps} />
    </Show>
  )
}
