/* eslint-disable react/prop-types */

import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useList } from '@refinedev/core'
import {
  Input,
  Switch,
  Table,
  Space,
  Form,
  Select,
  InputNumber,
  Tag,
} from 'antd'
import {
  useTable,
  List,
  Create,
  Edit,
  Show,
  EditButton,
  DeleteButton,
  DateField,
  useForm,
} from '@refinedev/antd'

import { formatCurrency } from '../utility/formatCurrency'

const StokForm = ({ formProps }) => {
  const { data: dataBahan } = useList({
    resource: 'bahan_baku',
  })

  const dataBahanOptions = useMemo(() => {
    if (!dataBahan?.data) return []

    return dataBahan?.data?.map((item) => {
      return {
        label: item?.nama_bahan,
        value: item?.id_bahan,
      }
    })
  }, [dataBahan?.data])

  return (
    <Form {...formProps} layout='vertical'>
      <Form.Item
        label='Bahan'
        name={['id_bahan']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select options={dataBahanOptions} />
      </Form.Item>
      <Form.Item
        label='Qty'
        name={['qty']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='Harga Bahan'
        name={['harga']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label='Status' name={['status']}>
        <Switch checkedChildren='Tersedia' unCheckedChildren='Tidak Tersedia' />
      </Form.Item>
      <Form.Item label='Keterangan' name={['keterangan']}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export const StokList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  })

  const { data: dataBahan } = useList({
    resource: 'bahan_baku',
  })

  return (
    <List title='Stok'>
      <Table {...tableProps} rowKey='id_stok'>
        <Table.Column dataIndex='id_stok' title='ID' />
        <Table.Column
          dataIndex='id_bahan'
          title='Bahan'
          render={(value) => {
            return dataBahan?.data?.filter?.(
              (item) => item?.id_bahan === value
            )?.[0]?.nama_bahan
          }}
        />
        <Table.Column dataIndex='qty' title='Qty' />
        <Table.Column
          dataIndex='harga'
          title='Harga'
          render={(value) => formatCurrency(value)}
        />
        <Table.Column
          dataIndex='status'
          title='Status'
          render={(value) =>
            value ? (
              <Tag color='blue'>Tersedia</Tag>
            ) : (
              <Tag color='red'>Tidak Tersedia</Tag>
            )
          }
        />
        <Table.Column
          dataIndex='keterangan'
          title='Keterangan'
          render={(value) => (value ? value : '-')}
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
                recordItemId={record.id_stok}
                meta={{ id_stok: record.id_stok }}
              />
              <DeleteButton
                hideText
                size='small'
                recordItemId={record.id_stok}
                meta={{
                  idColumnName: 'id_stok',
                  id_stok: record.id_stok,
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}

export const StokCreate = () => {
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <StokForm formProps={formProps} />
    </Create>
  )
}

export const StokEdit = () => {
  const { id_stok } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_stok,
    queryMeta: {
      idColumnName: 'id_stok',
    },
    mutationMeta: {
      idColumnName: 'id_stok',
    },
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <StokForm formProps={formProps} />
    </Edit>
  )
}

export const StokShow = () => {
  const { id_stok } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_stok,
    queryMeta: {
      idColumnName: 'id_stok',
    },
  })

  return (
    <Show saveButtonProps={saveButtonProps}>
      <StokForm formProps={formProps} />
    </Show>
  )
}
