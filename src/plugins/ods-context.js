/* global fetch */
import { openDB } from 'idb'

const baseUrl = 'https://public.opendatasoft.com/api/v2/catalog/datasets/donnees-hospitalieres-covid-19-dep-france/records'

const getServerData = async () => {
  const networkRes = await fetch(baseUrl)
  const networkData = networkRes.json()
  return networkData
}

export default async() => {
  if (!('indexedDB' in window)) { return null }

  const db = await openDB('Contexts', 1, {
    upgrade (db) {
      const store = db.createObjectStore('hosp', {
        keyPath: 'id',
        autoIncrement: true
      })
      store.createIndex('date', 'date')
    }
  })

  const networkData = await getServerData(baseUrl,'')
  await db.add('hosp', networkData)
}
