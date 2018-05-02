import { List, Record } from 'immutable';
import { Author } from './Author';

export class Publication extends Record({ id: '', title: '', url: '', pages: 0, year: 0 , authors: List()}) {

    constructor(id: string, title: string, url: string, pages: number, year: number, authors: List<Author>) {
        super();
        this.id = id;
        this.title = title;
        this.url = url;
        this.pages = pages;
        this.year = year;
        this.authors = authors;
    }

    get id(): string {
        return this.get('id');
    }

    set id(value: string) {
        this.set('id', value);
    }

    get title(): string {
        return this.get('title');
    }

    set title(value: string) {
        this.set('title', value);
    }

    get url(): string {
        return this.get('url');
    }

    set url(value: string) {
        this.set('url', value);
    }

    get pages(): number {
        return this.get('pages');
    }

    set pages(value: number) {
        this.set('pages', value);
    }

    get year(): number {
        return this.get('year');
    }

    set year(value: number) {
        this.set('year', value);
    }

    get authors(): List<Author> {
        return this.get('authors');
    }

    set authors(value: List<Author>) {
        this.set('authors', value);
    }

}