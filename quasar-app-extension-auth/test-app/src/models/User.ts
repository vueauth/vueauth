// User Model

import { Model } from 'pinia-orm'
import { Str, Uid } from 'pinia-orm/decorators'

export default class User extends Model {
  // entity is a required property for all models.
  static override entity = 'users'

  @Uid() declare id: string
  @Str('') declare name: string
  @Str('') declare email: string
}
