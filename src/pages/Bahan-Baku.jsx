/* eslint-disable react/prop-types */

import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useList } from '@refinedev/core'
import { Table, Space, Form, Input, Select, InputNumber } from 'antd'
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

import { formatCurrency } from '../utility/formatCurrency'

const BahanBakuForm = ({ formProps }) => {
  const { data: dataSupplier } = useList({
    resource: 'supplier',
  })

  const dataSupplierOptions = useMemo(() => {
    if (!dataSupplier?.data) return []

    return dataSupplier?.data?.map((item) => {
      return {
        label: item?.nama_supplier,
        value: item?.id_supplier,
      }
    })
  }, [dataSupplier?.data])

  return (
    <Form {...formProps} layout='vertical'>
      <Form.Item
        label='Supplier'
        name={['id_supplier']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select options={dataSupplierOptions} />
      </Form.Item>
      <Form.Item
        label='Nama Bahan'
        name={['nama_bahan']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Qty Bahan'
        name={['qty_bahan']}
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
        name={['harga_bahan']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='Total Bahan'
        name={['total_bahan']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    </Form>
  )
}

export const BahanBakuList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  })

  const { data: dataSupplier } = useList({
    resource: 'supplier',
  })

  return (
    <List title='Bahan Baku'>
      <Table {...tableProps} rowKey='id_bahan'>
        <Table.Column dataIndex='id_bahan' title='ID' />
        <Table.Column
          dataIndex='id_supplier'
          title='Supplier'
          render={(value) => {
            return dataSupplier?.data?.filter?.(
              (item) => item.id_supplier === value
            )?.[0]?.nama_supplier
          }}
        />
        <Table.Column dataIndex='nama_bahan' title='Nama' />
        <Table.Column dataIndex='qty_bahan' title='Qty' />
        <Table.Column
          dataIndex='harga_bahan'
          title='Harga'
          render={(value) => formatCurrency(value)}
        />
        <Table.Column
          dataIndex='total_bahan'
          title='Total'
          render={(value) => formatCurrency(value)}
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
                recordItemId={record.id_bahan}
                meta={{ id_bahan: record.id_bahan }}
              />
              <ShowButton
                hideText
                size='small'
                recordItemId={record.id_bahan}
                meta={{ id_bahan: record.id_bahan }}
              />
              <DeleteButton
                hideText
                size='small'
                recordItemId={record.id_bahan}
                meta={{
                  idColumnName: 'id_bahan',
                  id_bahan: record.id_bahan,
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}

export const BahanBakuCreate = () => {
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <BahanBakuForm formProps={formProps} />
    </Create>
  )
}

export const BahanBakuEdit = () => {
  const { id_bahan } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_bahan,
    queryMeta: {
      idColumnName: 'id_bahan',
    },
    mutationMeta: {
      idColumnName: 'id_bahan',
    },
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <BahanBakuForm formProps={formProps} />
    </Edit>
  )
}

export const BahanBakuShow = () => {
  const { id_bahan } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_bahan,
    queryMeta: {
      idColumnName: 'id_bahan',
    },
  })

  return (
    <Show saveButtonProps={saveButtonProps}>
      <BahanBakuForm formProps={formProps} />
    </Show>
  )
}
