import { setLocalStorage } from 'src/utils/watchLocalStorage'

type User = {
  // The user must have "email", "password", etc.
  // It also needs an "id" (or whatever keyPath you specify below) when storing.
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
  private authKey = 'authenticatedUserEmail'
  private version = 1
  private mockLatencyMs = 0

  // Key path defaults to "id"
  private keyPath = 'id'

  constructor (options: AuthDbOptions = {}) {
    if (typeof options.mockLatencyMs === 'number') {
      this.mockLatencyMs = options.mockLatencyMs
    }
    if (options.dbName) this.dbName = options.dbName
    if (options.storeName) this.storeName = options.storeName
    // Allow overriding the key path (defaults to 'id')
    if (options.keyPath) this.keyPath = options.keyPath

    // Initialize database
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
        // Use the chosen key path instead of "email"
        db.createObjectStore(this.storeName, { keyPath: this.keyPath })
      }
    }
    // No need to block on init here; we just set it up.
  }

  private async getDB (): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // ---------------------------------------------------------------
  //  Create user
  // ---------------------------------------------------------------
  async register (user: User): Promise<void> {
    await this.sleep()

    // Make sure user doesn’t already exist by email
    const existing = await this.getUser(user.email)
    if (existing) {
      throw new Error('User already exists')
    }

    // If user has no ID set (and your keyPath is something other than 'email'),
    // you should set one here. For example:
    //
    //   if (!user[this.keyPath]) {
    //     user[this.keyPath] = crypto.randomUUID()
    //   }
    //
    // But if you always supply an ID from outside, skip this.

    // Now store user
    const db = await this.getDB()
    const tx = db.transaction(this.storeName, 'readwrite')
    const store = tx.objectStore(this.storeName)

    store.put(user)
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })

    // Save in localStorage that we’re authenticated as this user’s email
    setLocalStorage(this.authKey, user.email)
  }

  // ---------------------------------------------------------------
  //  Delete user
  // ---------------------------------------------------------------
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

  // ---------------------------------------------------------------
  //  Login (by email, then check password)
  // ---------------------------------------------------------------
  async login ({ email, password }: { email: string; password: string }): Promise<boolean> {
    await this.sleep()
    // We have to scan for this user by email
    const user = await this.getUser(email)
    const isValid = !!user && user.password === password
    if (isValid) {
      localStorage.setItem(this.authKey, email)
    }
    return isValid
  }

  // ---------------------------------------------------------------
  //  Change password (still looks up by email, then saves by id)
  // ---------------------------------------------------------------
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

    // Step 1: fetch user by email
    const user = await this.getUser(email)
    if (!user) throw new Error('User not found')

    if (oldPassword && user.password !== oldPassword) {
      throw new Error('Old password is incorrect')
    }

    // Step 2: open a transaction and update the record by its primary key
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

  // ---------------------------------------------------------------
  //  Get user by email (no index, so we scan the store)
  // ---------------------------------------------------------------
  private async getUser (email: string): Promise<User | undefined> {
    const db = await this.getDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly')
      const store = tx.objectStore(this.storeName)

      // Because we're not using an index on 'email', we open a cursor
      // and scan until we find a matching email or run out of entries
      const request = store.openCursor()
      request.onsuccess = () => {
        const cursor = request.result
        if (!cursor) {
          // Not found
          resolve(undefined)
          return
        }
        const record = cursor.value as User
        if (record.email === email) {
          // Found our user
          resolve(record)
        } else {
          // Keep looking
          cursor.continue()
        }
      }
      request.onerror = () => reject(request.error)
    })
  }

  // ---------------------------------------------------------------
  //  Get the currently authenticated user (by email in localStorage)
  // ---------------------------------------------------------------
  async getAuthenticatedUser (): Promise<User | null> {
    await this.sleep()
    const email = localStorage.getItem(this.authKey)
    if (!email) return null
    return (await this.getUser(email)) ?? null
  }

  // ---------------------------------------------------------------
  //  Logout
  // ---------------------------------------------------------------
  async logout (): Promise<void> {
    await this.sleep()
    localStorage.removeItem(this.authKey)
  }

  // ---------------------------------------------------------------
  //  For testing (fake latency)
  // ---------------------------------------------------------------
  setFakeTimeout (timeout: number) {
    this.mockLatencyMs = timeout
  }
}
