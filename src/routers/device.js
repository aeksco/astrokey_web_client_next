// Device Containers
import DeviceList from '@/containers/device_list'
import DeviceShow from '@/containers/device_show'

export const DeviceListRoute = {
  path: '/devices',
  component: DeviceList,
  props: true
}

export const DeviceShowRoute = {
  path: '/devices/:id',
  component: DeviceShow,
  props: true
}
