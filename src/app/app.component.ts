import { Person } from './person.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as faker from 'faker';
import { select, Store } from '@ngrx/store';
import { AppState } from './store';
import { PersonDelete, PersonNew, PersonUpdate } from './store/person.actions';
import { OnInit } from '@angular/core';
import * as fromPersonSelector from './store/person.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  people$: Observable<Person[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.people$ = this.store.select(fromPersonSelector.selectAll);
  }

  addNew(): void {
    const person: Person = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100),
      _id: new Date().getMilliseconds().toString(),
    };
    this.store.dispatch(new PersonNew({ person }));
  }

  update(p: Person): void {
    p.name = faker.name.findName();
    p.address = faker.address.streetAddress();
    p.city = faker.address.city();
    p.country = faker.address.country();
    p.age = Math.round(Math.random() * 100);

    this.store.dispatch(new PersonUpdate({ id: p._id, changes: p }));
  }

  delete(person: Person): void {
    this.store.dispatch(new PersonDelete({ id: person._id }));
  }
}
