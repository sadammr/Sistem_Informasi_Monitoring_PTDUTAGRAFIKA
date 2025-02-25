const BASE_STOK = 'stok'
const BASE_PENGGUNA = 'pengguna'
const BASE_SUPPLIER = 'supplier'
const BASE_BAHAN_BAKU = 'bahan-baku'
const BASE_BAHAN_MASUK = 'bahan-masuk'
const BASE_BAHAN_KELUAR = 'bahan-keluar'

const BASE_CREATE = 'create'
const BASE_EDIT = 'edit'

const resources = [
  {
    name: 'home',
    list: '/',
    meta: {
      hide: true,
    },
  },
  {
    name: 'supplier',
    list: `/${BASE_SUPPLIER}`,
    create: `/${BASE_SUPPLIER}/${BASE_CREATE}`,
    edit: `/${BASE_SUPPLIER}/${BASE_EDIT}/:id_supplier`,
    meta: {
      canDelete: true,
      label: 'Supplier',
    },
  },
  {
    name: 'bahan_baku',
    list: `/${BASE_BAHAN_BAKU}`,
    create: `/${BASE_BAHAN_BAKU}/${BASE_CREATE}`,
    edit: `/${BASE_BAHAN_BAKU}/${BASE_EDIT}/:id_bahan`,
    meta: {
      canDelete: true,
      label: 'Bahan Baku',
    },
  },
  {
    name: 'stok',
    list: `/${BASE_STOK}`,
    create: `/${BASE_STOK}/${BASE_CREATE}`,
    edit: `/${BASE_STOK}/${BASE_EDIT}/:id_stok`,
    meta: {
      canDelete: true,
      label: 'Stok',
    },
  },
  {
    name: 'bahan_masuk',
    list: `/${BASE_BAHAN_MASUK}`,
    create: `/${BASE_BAHAN_MASUK}/${BASE_CREATE}`,
    edit: `/${BASE_BAHAN_MASUK}/${BASE_EDIT}/:id_bm`,
    meta: {
      canDelete: true,
      label: 'Bahan Masuk',
    },
  },
  {
    name: 'bahan_keluar',
    list: `/${BASE_BAHAN_KELUAR}`,
    create: `/${BASE_BAHAN_KELUAR}/${BASE_CREATE}`,
    edit: `/${BASE_BAHAN_KELUAR}/${BASE_EDIT}/:id_bk`,
    meta: {
      canDelete: true,
      label: 'Bahan Keluar',
    },
  },
  {
    name: 'pengguna',
    list: `/${BASE_PENGGUNA}`,
    create: `/${BASE_PENGGUNA}/${BASE_CREATE}`,
    edit: `/${BASE_PENGGUNA}/${BASE_EDIT}/:user_id`,
    meta: {
      canDelete: true,
      label: 'Pengguna',
    },
  },
]

export { resources }
