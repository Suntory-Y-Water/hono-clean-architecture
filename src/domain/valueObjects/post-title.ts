export class PostTitle {
  private readonly _value: string;

  constructor(value: string) {
    if (value.length > 36) {
      throw new Error('Title must be 36 characters or less.');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
