import { Expose, Exclude } from 'class-transformer';

/** Exposed user DTO entity */
export abstract class Dto {

  @Exclude()
  _id: string;

  @Expose()
  get id(): string {
    return this._id.toString();
  }
}
