/* eslint-disable react/prop-types */

import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useList } from '@refinedev/core'
import { Table, Space, Form, Select, DatePicker, InputNumber } from 'antd'
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

const BahanMasukForm = ({ formProps }) => {
  const { data: dataBahan } = useList({
    resource: 'bahan_baku',
  })

  const { data: dataSupplier } = useList({
    resource: 'supplier',
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
        label='Tanggal Masuk'
        name={['tgl_masuk']}
        rules={[
          {
            required: true,
          },
        ]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : undefined,
        })}
      >
        <DatePicker />
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
    </Form>
  )
}

export const BahanMasukList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  })

  const { data: dataBahan } = useList({
    resource: 'bahan_baku',
  })

  const { data: dataSupplier } = useList({
    resource: 'supplier',
  })

  return (
    <List title='Bahan Masuk'>
      <Table {...tableProps} rowKey='id_bm'>
        <Table.Column dataIndex='id_bm' title='ID' />
        <Table.Column
          dataIndex='id_bahan'
          title='Bahan'
          render={(value) => {
            return dataBahan?.data?.filter?.(
              (item) => item?.id_bahan === value
            )?.[0]?.nama_bahan
          }}
        />
        <Table.Column
          dataIndex='id_supplier'
          title='Supplier'
          render={(value) => {
            return dataSupplier?.data?.filter?.(
              (item) => item?.id_supplier === value
            )?.[0]?.nama_supplier
          }}
        />
        <Table.Column
          dataIndex={['tgl_masuk']}
          title='Tanggal Masuk'
          render={(value) => <DateField value={value} />}
        />
        <Table.Column dataIndex='qty' title='Qty' />
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
                recordItemId={record.id_bm}
                meta={{ id_bm: record.id_bm }}
              />
              <ShowButton
                hideText
                size='small'
                recordItemId={record.id_bm}
                meta={{ id_bm: record.id_bm }}
              />
              <DeleteButton
                hideText
                size='small'
                recordItemId={record.id_bm}
                meta={{
                  id_bm: record.id_bm,
                  idColumnName: 'id_bm',
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}

export const BahanMasukCreate = () => {
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <BahanMasukForm formProps={formProps} />
    </Create>
  )
}

export const BahanMasukEdit = () => {
  const { id_bm } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_bm,
    queryMeta: {
      idColumnName: 'id_bm',
    },
    mutationMeta: {
      idColumnName: 'id_bm',
    },
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <BahanMasukForm formProps={formProps} />
    </Edit>
  )
}

export const BahanMasukShow = () => {
  const { id_bm } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_bm,
    queryMeta: {
      idColumnName: 'id_bm',
    },
  })

  return (
    <Show saveButtonProps={saveButtonProps}>
      <BahanMasukForm formProps={formProps} />
    </Show>
  )
}
