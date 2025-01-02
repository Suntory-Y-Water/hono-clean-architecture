export class PostTitle {
  private readonly _value: string;
  public static lengthErrorMessage = 'Title must be 36 characters or less.';

  constructor(value: string) {
    if (value.length > 36) {
      throw new Error(PostTitle.lengthErrorMessage);
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
