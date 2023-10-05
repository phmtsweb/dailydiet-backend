import { Optional } from '@/@types/optional'
import { Entity, EntityProps } from '@/core/entities/entity'

type UserProps = {
  name: string
  email: string
  password: string
}

export class User extends Entity<UserProps> {
  private constructor(props: EntityProps<UserProps>) {
    super(props)
  }

  public static create(
    props: Optional<EntityProps<UserProps>, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touchUpdatedAt()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touchUpdatedAt()
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touchUpdatedAt()
  }
}
