// DeviceType Containers
import DeviceTypeList from '@/containers/device_type_list'
import DeviceTypeNew from '@/containers/device_type_new'
import DeviceTypeShow from '@/containers/device_type_show'
import DeviceTypeEdit from '@/containers/device_type_edit'

export const DeviceTypeListRoute = {
  path: '/device_types',
  component: DeviceTypeList
}

export const DeviceTypeNewRoute = {
  path: '/device_types/new',
  component: DeviceTypeNew
}

export const DeviceTypeShowRoute = {
  path: '/device_types/:id',
  component: DeviceTypeShow,
  props: true
}

export const DeviceTypeEditRoute = {
  path: '/device_types/:id/edit',
  component: DeviceTypeEdit,
  props: true
}
