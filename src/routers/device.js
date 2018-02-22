// Device Containers
import DeviceList from '@/containers/device_list'
import DeviceShow from '@/containers/device_show'
import DeviceInterface from '@/containers/device_interface'

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

export const DeviceInterfaceRoute = {
  path: '/devices/:id/interface',
  component: DeviceInterface,
  props: true
}
