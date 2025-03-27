import { setLocalStorage } from 'src/utils/watchLocalStorage'

type User = {
  id: string
  name: string
  email: string
  password: string
  [x: string]: any
}

export interface AuthDbOptions {
  mockLatencyMs?: number
  dbName?: string
  storeName?: string
  keyPath?: string
}

export class AuthDb {
  private dbName = 'local:users'
  private storeName = 'local:users'
  private authEmailKey = 'authenticatedUserEmail'
  private authIdKey = 'authenticatedUserId'
  private version = 1
  private mockLatencyMs = 0

  private keyPath = 'id'

  constructor (options: AuthDbOptions = {}) {
    if (typeof options.mockLatencyMs === 'number') {
      this.mockLatencyMs = options.mockLatencyMs
    }
    if (options.dbName) this.dbName = options.dbName
    if (options.storeName) this.storeName = options.storeName
    if (options.keyPath) this.keyPath = options.keyPath

    this.init()
  }

  async sleep () {
    if (this.mockLatencyMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.mockLatencyMs))
    }
  }

  private async init () {
    const request = indexedDB.open(this.dbName, this.version)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: this.keyPath })
      }
    }
  }

  private async getDB (): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async register (user: User): Promise<void> {
    await this.sleep()

    const existing = await this.getUser(user.email)
    if (existing) {
      throw new Error('User already exists')
    }

    const db = await this.getDB()
    const tx = db.transaction(this.storeName, 'readwrite')
    const store = tx.objectStore(this.storeName)

    store.put(user)
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })

    setLocalStorage(this.authEmailKey, user.email)
    setLocalStorage(this.authIdKey, user.id)
  }

  async deleteUser (id: string): Promise<void> {
    await this.sleep()
    const db = await this.getDB()
    const tx = db.transaction(this.storeName, 'readwrite')
    tx.objectStore(this.storeName).delete(id)
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async login ({ email, password }: { email: string; password: string }): Promise<boolean> {
    await this.sleep()
    const user = await this.getUser(email)
    const isValid = !!user && user.password === password
    if (isValid) {
      localStorage.setItem(this.authEmailKey, email)
      localStorage.setItem(this.authIdKey, email)
    }
    return isValid
  }

  async changePassword ({
    email,
    oldPassword,
    newPassword,
  }: {
    email: string
    oldPassword?: string
    newPassword: string
  }): Promise<void> {
    await this.sleep()

    const user = await this.getUser(email)
    if (!user) throw new Error('User not found')

    if (oldPassword && user.password !== oldPassword) {
      throw new Error('Old password is incorrect')
    }

    const db = await this.getDB()
    const tx = db.transaction(this.storeName, 'readwrite')
    const store = tx.objectStore(this.storeName)

    user.password = newPassword
    store.put(user)

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  private async getUser (email: string): Promise<User | undefined> {
    const db = await this.getDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly')
      const store = tx.objectStore(this.storeName)

      const request = store.openCursor()
      request.onsuccess = () => {
        const cursor = request.result
        if (!cursor) {
          resolve(undefined)
          return
        }
        const record = cursor.value as User
        if (record.email === email) {
          resolve(record)
        } else {
          cursor.continue()
        }
      }
      request.onerror = () => reject(request.error)
    })
  }

  async getAuthenticatedUser (): Promise<User | null> {
    await this.sleep()
    const email = localStorage.getItem(this.authEmailKey)
    if (!email) return null
    return (await this.getUser(email)) ?? null
  }

  async logout (): Promise<void> {
    await this.sleep()
    localStorage.removeItem(this.authEmailKey)
    localStorage.removeItem(this.authIdKey)
  }

  setFakeTimeout (timeout: number) {
    this.mockLatencyMs = timeout
  }
}
