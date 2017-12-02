// Device Containers
import DeviceList from '@/containers/device_list'
import DeviceNew from '@/containers/device_new'
import DeviceShow from '@/containers/device_show'
import DeviceEdit from '@/containers/device_edit'

export const DeviceListRoute = {
  path: '/devices',
  component: DeviceList
}

export const DeviceNewRoute = {
  path: '/devices/new',
  component: DeviceNew
}

export const DeviceShowRoute = {
  path: '/devices/:id',
  component: DeviceShow,
  props: true
}

export const DeviceEditRoute = {
  path: '/devices/:id/edit',
  component: DeviceEdit,
  props: true
}
