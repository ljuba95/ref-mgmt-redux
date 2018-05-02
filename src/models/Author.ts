import { Record } from 'immutable';

export class Author extends Record({id: '', name: '', familyName: ''}) {

    constructor(id: string, name: string, familyName: string) {
        super();
        this.id = id;
        this.name = name;
        this.familyName = familyName;
    }

    get id(): string {
        return this.get('id');
    }

    set id(value: string) {
        this.set('id', value);
    }

    get name(): string {
        return this.get('name');
    }

    set name(value: string) {
        this.set('name', value);
    }

    get familyName(): string {
        return this.get('familyName');
    }

    set familyName(value: string) {
        this.set('familyName', value);
    }
}