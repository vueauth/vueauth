// User Model

import { Model } from 'pinia-orm'
import { Str, Uid } from 'pinia-orm/decorators'
import { BelongsTo } from 'pinia-orm/dist/decorators'
import User from './User'
import { Bool } from 'pinia-orm/dist/decorators'

export default class Todo extends Model {
  // entity is a required property for all models.
  static override entity = 'todos'

  @Uid() declare id: string
  @Str('') declare title: string
  @Bool(false) declare completed: boolean | null
  @Str('') declare user_id: string

  @BelongsTo(() => User, 'user_id') declare user: User | null
}
