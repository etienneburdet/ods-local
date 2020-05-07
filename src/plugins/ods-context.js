/* global fetch */
import { openDB } from 'idb'

const baseUrl = 'https://public.opendatasoft.com/api/v2/catalog/datasets/donnees-hospitalieres-covid-19-dep-france/records'

const getServerData = async () => {
  const networkRes = await fetch(baseUrl)
  const networkData = networkRes.json()
  return networkData
}

const createIndexedDB = async () => {
  const db = await openDB('Contexts', 1, {
    upgrade (db) {
      const store = db.createObjectStore('hosp', {
        keyPath: 'id'
      })
      store.createIndex('date', 'date')
    }
  })
  return db
}

export default async () => {
  if (!('indexedDB' in window)) { return null }

  const db = await createIndexedDB()

  const networkData = await getServerData()
  await db.clear('hosp')
  const tx = db.transaction('hosp', 'readwrite')
  networkData.records.forEach( record => tx.store.add(record))
  await tx.done
}
