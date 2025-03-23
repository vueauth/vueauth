type User = {
  [x: string]: any,
  name: string;
  email: string;
  password: string;
};

export interface AuthDbOptions {
  mockLatencyMs?: number
  dbName?: string
  storeName?: string
}

export class AuthDb {
  private dbName = 'local:users'
  private storeName = 'local:users'
  private authKey = 'authenticatedUserEmail'
  private version = 1
  private mockLatencyMs = 0

  constructor (options: AuthDbOptions = {}) {
    if (typeof options.mockLatencyMs === 'number') {
      this.mockLatencyMs = options.mockLatencyMs
    }
    if (options.dbName) this.dbName = options.dbName
    if (options.storeName) this.storeName = options.storeName

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
        db.createObjectStore(this.storeName, { keyPath: 'email' })
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

    localStorage.setItem(this.authKey, user.email)
  }

  async deleteUser (email: string): Promise<void> {
    await this.sleep()
    const db = await this.getDB()
    const tx = db.transaction(this.storeName, 'readwrite')
    tx.objectStore(this.storeName).delete(email)
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
      localStorage.setItem(this.authKey, email)
    }
    return isValid
  }

  async changePassword ({
    email,
    oldPassword,
    newPassword,
  }: {
    email: string
    oldPassword?: string | undefined
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
      const request = tx.objectStore(this.storeName).get(email)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getAuthenticatedUser (): Promise<User | null> {
    await this.sleep()
    const email = localStorage.getItem(this.authKey)
    if (!email) return null
    return (await this.getUser(email)) ?? null
  }

  async logout (): Promise<void> {
    await this.sleep()
    localStorage.removeItem(this.authKey)
  }

  setFakeTimeout (timeout: number) {
    this.mockLatencyMs = timeout
  }
}
