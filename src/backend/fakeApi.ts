import v4 from 'uuid/v4';
import { AuthorParams } from '../models/Author';
import * as faker from 'faker';

interface PublicationParams {
    id: string;
    title: string;
    url: string;
    pages: number;
    year: number;
    authors: string[];
}

const fakeDb = {

    publications: [
        {
            id: v4(),
            title: 'NPM',
            url: 'www.google.com',
            pages: 150,
            year: 2013,
            authors: ['1']
        }
    ] as PublicationParams[],

    authors: [
        {
            id: '1',
            name: 'Pera',
            familyName: 'Peric'
        }
    ] as AuthorParams[]
};

for (let i = 0; i < 30; i++) {
    fakeDb.authors.push({
        id: v4(),
        name: faker.name.firstName(),
        familyName: faker.name.lastName()
    });
}

for (let i = 0; i < 20; i++) {
    fakeDb.publications.push({
        id: v4(),
        title: faker.hacker.abbreviation(),
        url: faker.internet.url(),
        pages: faker.random.number(500),
        year: faker.random.number(2020),
        authors: [fakeDb.authors[i].id, fakeDb.authors[i + 1].id, fakeDb.authors[i + 2].id]
    });
}

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

const delayDefault: number = 500;

export const fetchPublications = (delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => fakeDb.publications);
};

export const fetchPublicationById = (id: string, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        return fakeDb.publications.find(value => value.id === id);
    });
};

export const addPublication = (publication: PublicationParams, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        publication.id = v4();
        fakeDb.publications.push(publication);
        return publication;
    });
};

export const deletePublication = (id: string, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        fakeDb.publications = fakeDb.publications.filter((pub: PublicationParams) => pub.id !== id);
        return id;
    });
};

export const updatePublication = (pub: PublicationParams, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        let index = fakeDb.publications.findIndex((publication: PublicationParams) => publication.id === pub.id);
        if (index >= 0) {
            fakeDb.publications[index] = pub;
        }
        return fakeDb.publications[index];

    });
};

// authors================================

export const fetchAuthors = (delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => fakeDb.authors);
};

export const addAuthor = (author: AuthorParams, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        author.id = v4();
        fakeDb.authors.push(author);
        return author;
    });
};

export const deleteAuthor = (id: string, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        fakeDb.authors = fakeDb.authors.filter((author: AuthorParams) => author.id !== id);
        return id;
    });
};

export const updateAuthor = (author: AuthorParams, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        let index = fakeDb.authors.findIndex((aut: AuthorParams) => aut.id === aut.id);
        if (index >= 0) {
            fakeDb.authors[index] = author;
        }
        return fakeDb.authors[index];

    });
};

export const setAuthorsOfPublication = (pubId: string, authorIds: string[], delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        let index = fakeDb.publications.findIndex((pub: PublicationParams) => pub.id === pubId);
        if (index >= 0) {
            fakeDb.publications[index].authors = authorIds;
        }
        return fakeDb.publications[index];
    });
};