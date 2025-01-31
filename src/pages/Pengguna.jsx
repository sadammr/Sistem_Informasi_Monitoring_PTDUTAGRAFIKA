/* eslint-disable react/prop-types */

import { useParams } from 'react-router'
import { Table, Space, Form, Input, Select } from 'antd'
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
  EmailField,
} from '@refinedev/antd'

const PenggunaForm = ({ formProps }) => {
  return (
    <Form {...formProps} layout='vertical'>
      <Form.Item
        label='Nama'
        name={['user_nama']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Username'
        name={['user_name']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Email'
        name={['email']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name={['user_password']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label='Level'
        name={['level']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          options={[
            {
              label: 'Tim Administrasi',
              value: 'tim-administrasi',
            },
            {
              label: 'Tim Produksi',
              value: 'tim-produksi',
            },
            {
              label: 'Staf Gudang',
              value: 'staf-gudang',
            },
          ]}
        />
      </Form.Item>
    </Form>
  )
}

export const PenggunaList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  })

  return (
    <List title='Pengguna'>
      <Table {...tableProps} rowKey='user_id'>
        <Table.Column dataIndex='user_nama' title='Nama' />
        <Table.Column dataIndex='user_name' title='Username' />
        <Table.Column
          dataIndex='level'
          title='Level'
          render={(value) => {
            const label = [
              {
                label: 'Tim Administrasi',
                value: 'tim-administrasi',
              },
              {
                label: 'Tim Produksi',
                value: 'tim-produksi',
              },
              {
                label: 'Staf Gudang',
                value: 'staf-gudang',
              },
            ].filter((item) => item.value === value)

            return label?.at?.(0)?.label
          }}
        />
        <Table.Column
          dataIndex={['email']}
          title='Email'
          render={(value) => <EmailField value={value} />}
        />
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
                recordItemId={record.user_id}
                meta={{ user_id: record.user_id }}
              />
              <ShowButton
                hideText
                size='small'
                recordItemId={record.user_id}
                meta={{ user_id: record.user_id }}
              />
              <DeleteButton
                hideText
                size='small'
                recordItemId={record.user_id}
                meta={{ user_id: record.user_id, idColumnName: 'user_id' }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}

export const PenggunaCreate = () => {
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <PenggunaForm formProps={formProps} />
    </Create>
  )
}

export const PenggunaEdit = () => {
  const { user_id } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: user_id,
    queryMeta: {
      idColumnName: 'user_id',
    },
    mutationMeta: {
      idColumnName: 'user_id',
    },
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <PenggunaForm formProps={formProps} />
    </Edit>
  )
}

export const PenggunaShow = () => {
  const { user_id } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: user_id,
    queryMeta: {
      idColumnName: 'user_id',
    },
  })

  return (
    <Show saveButtonProps={saveButtonProps}>
      <PenggunaForm formProps={formProps} />
    </Show>
  )
}
