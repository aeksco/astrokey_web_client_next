// Wallet Containers
import WalletList from '@/containers/wallet_list'
import WalletNew from '@/containers/wallet_new'

export const WalletListRoute = {
  path: '/wallets',
  component: WalletList
}

export const WalletNewRoute = {
  path: '/wallets/new',
  component: WalletNew
}
