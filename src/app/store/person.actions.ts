import { Person } from './../person.model';
import { Action } from '@ngrx/store';

export enum PersonActionTypes {
  PERSON_ALL = '[PERSON_ALL] Get All People',
  PERSON_NEW = '[PERSON_NEW] Add a new Person',
  PERSON_UPDATE = '[PERSON_UPDATE] Update a Person',
  PERSON_DELETE = '[PERSON_DELETE] Delete a Person',
}

export class PersonAll implements Action {
  readonly type = PersonActionTypes.PERSON_ALL;
}

export class PersonNew implements Action {
  readonly type = PersonActionTypes.PERSON_NEW;
  constructor(public payload: { person: Person }) {}
}

export class PersonUpdate implements Action {
  readonly type = PersonActionTypes.PERSON_UPDATE;
  constructor(public payload: {id: string,  changes: Partial<Person> }) {}
}

export class PersonDelete implements Action {
  readonly type = PersonActionTypes.PERSON_DELETE;
  constructor(public payload: { id: string }) {}
}

export type PersonActions = PersonAll | PersonNew | PersonUpdate | PersonDelete;
