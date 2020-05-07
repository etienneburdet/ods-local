/* global fetch, localStorage */
import { openDB } from 'idb'

const baseUrl = 'https://public.opendatasoft.com/api/v2/catalog/datasets/donnees-hospitalieres-covid-19-dep-france/'
const query = "aggregates?select=sum(day_hosp) as sum_hos, sum(day_intcare) as sum_intcare, sum(tot_death) as sum_death, sum(tot_out) as sum_out&where=sex like 'Tous'&group_by=date&order_by=-date&limit=1"

const getServerData = async () => {
  const networkRes = await fetch(baseUrl + query)
  const networkData = networkRes.json()
  return networkData
}

const getLocalData = async (db) => {
  if (!('indexedDB' in window)) { return null }
  return db.getAll('hosp')
}

const setLastUpdated = (date) => localStorage.setItem('lastUpdated', date)

const createIndexedDB = async () => {
  const db = await openDB('Contexts', 1, {
    upgrade (db) {
      db.createObjectStore('hosp', {
        keyPath: 'id',
        autoIncrement: true
      })
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
    networkData.aggregations.forEach(record => tx.store.add(record))
    await tx.done
    setLastUpdated(new Date())
    return { data: networkData.aggregations, status: 'online' }
  } catch (err) {
    console.log('Network request failed. Offline mode !')
    console.error(err)
    const offlineData = await getLocalData(db)
    return { data: offlineData, status: 'offline' }
  }
}
