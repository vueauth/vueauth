type WatchCallback = (newValue: string | null, oldValue: string | null) => void

export function watchLocalStorage (
  key: string,
  callback: WatchCallback,
) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) {
      callback(event.newValue, event.oldValue)
    }
  }

  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener('storage', handleStorage)
  }
}

export function setLocalStorage (key: string, value: string) {
  const oldValue = localStorage.getItem(key)
  localStorage.setItem(key, value)

  const event = new StorageEvent('storage', {
    key,
    oldValue,
    newValue: value,
    storageArea: localStorage,
  })
  window.dispatchEvent(event)
}
