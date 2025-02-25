/* eslint-disable react/prop-types */

import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useList } from '@refinedev/core'
import {
  Table,
  Space,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Input,
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

const BahanKeluarForm = ({ formProps }) => {
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
        label='Tanggal Keluar'
        name={['tgl_keluar']}
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
      <Form.Item
        label='Keterangan'
        name={['keterangan']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export const BahanKeluarList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  })

  const { data: dataBahan } = useList({
    resource: 'bahan_baku',
  })

  return (
    <List title='Bahan Keluar'>
      <Table {...tableProps} rowKey='id_bk'>
        <Table.Column dataIndex='id_bk' title='ID' />
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
          dataIndex={['tgl_keluar']}
          title='Tanggal Keluar'
          render={(value) => <DateField value={value} />}
        />
        <Table.Column dataIndex='qty' title='Qty' />
        <Table.Column dataIndex='keterangan' title='Keterangan' />
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
                recordItemId={record.id_bk}
                meta={{ id_bk: record.id_bk }}
              />
              <DeleteButton
                hideText
                size='small'
                recordItemId={record.id_bk}
                meta={{
                  id_bk: record.id_bk,
                  idColumnName: 'id_bk',
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}

export const BahanKeluarCreate = () => {
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <BahanKeluarForm formProps={formProps} />
    </Create>
  )
}

export const BahanKeluarEdit = () => {
  const { id_bk } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_bk,
    queryMeta: {
      idColumnName: 'id_bk',
    },
    mutationMeta: {
      idColumnName: 'id_bk',
    },
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <BahanKeluarForm formProps={formProps} />
    </Edit>
  )
}

export const BahanKeluarShow = () => {
  const { id_bk } = useParams()
  const { formProps, saveButtonProps } = useForm({
    id: id_bk,
    queryMeta: {
      idColumnName: 'id_bk',
    },
  })

  return (
    <Show saveButtonProps={saveButtonProps}>
      <BahanKeluarForm formProps={formProps} />
    </Show>
  )
}
