/* global fetch */
import { openDB } from 'idb'

const baseUrl = 'https://public.opendatasoft.com/api/v2/catalog/datasets/donnees-hospitalieres-covid-19-dep-france/records'

const getServerData = async () => {
  const networkRes = await fetch(baseUrl)
  const networkData = networkRes.json()
  return networkData
}

const getLocalData = async (db) => {
  if (!('indexedDB' in window)) { return null }
  return db.getAll('hosp')
}

const upDateUi = (msg, data) => {
  console.log(msg, data)
}

const noDataMsg = async () => {
  console.log('No local data saved')
}

const createIndexedDB = async () => {
  const db = await openDB('Contexts', 1, {
    upgrade (db) {
      const store = db.createObjectStore('hosp', {
        keyPath: 'id',
        autoIncrement: true
      })
      store.createIndex('date', 'date')
    }
  })
  return db
}

export default async () => {
  if (!('indexedDB' in window)) { return null }
  const db = await createIndexedDB()
  try {
    const networkData = await getServerData()
    await db.clear('hosp')
    const tx = db.transaction('hosp', 'readwrite')
    networkData.records.forEach(record => tx.store.add(record))
    await tx.done
    upDateUi('From Network :', networkData)
  } catch {
    console.log('Network request failed. Offline mode !')
    const offlineData = await getLocalData(db)
    offlineData ? upDateUi('From cache', offlineData) : noDataMsg()
  }
}
