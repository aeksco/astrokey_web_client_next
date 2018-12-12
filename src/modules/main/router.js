// Main Containers
import MainHome from './pages/home'
import MainAbout from './pages/about'
import Lyrebird from './pages/lyrebird'

const HomeRoute = {
  path: '/',
  name: 'Home',
  component: MainHome
}

const AboutRoute = {
  path: '/about',
  name: 'About',
  component: MainAbout
}

const LyrebirdRoute = {
  path: '/lyrebird',
  name: 'Lyrebird',
  component: Lyrebird
}

export default [
  HomeRoute,
  AboutRoute,
  LyrebirdRoute
]
