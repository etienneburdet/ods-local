/* global self */
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

registerRoute(
  new RegExp('https://data\\.opendatasoft\\.com/api/.*'),
  new NetworkFirst()
)

precacheAndRoute(self.__WB_MANIFEST)
