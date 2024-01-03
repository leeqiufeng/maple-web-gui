export class BaseListResult<T extends any> {
  total: number;
  items: T[];

  public static Result<T>(): BaseListResult<T> {
    return new BaseListResult<T>();
  }
}