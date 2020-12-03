import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';
import { Person } from '../person.model';
import { PersonActions, PersonActionTypes } from './person.actions';

export interface PeopleState extends EntityState<Person> {}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  selectId: (instance) => instance._id
});

export const initialState: PeopleState = peopleAdapter.getInitialState([]);

export function reducer(state = initialState, action: PersonActions): PeopleState {
  switch (action.type) {
    case PersonActionTypes.PERSON_NEW:
      return peopleAdapter.addOne(action.payload.person, state);
    case PersonActionTypes.PERSON_UPDATE:
      return peopleAdapter.updateOne(
        { id: action.payload.id, changes: action.payload.changes },
        state
      );
    case PersonActionTypes.PERSON_DELETE:
      return peopleAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
