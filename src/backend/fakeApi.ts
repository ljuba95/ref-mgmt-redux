import v4 from 'uuid/v4';
import { Publication } from '../models/Publication';

const fakeDb = {
    publications: [
        {
            id: v4(),
            title: 'npm',
            url: 'www.google.com',
            pages: 150,
            year: 2013
        },
        {
            id: v4(),
            title: 'typescript',
            url: 'www.google.com',
            pages: 120,
            year: 2015
        },
        {
            id: v4(),
            title: 'node',
            url: 'www.google.com',
            pages: 30,
            year: 2009
        },
        {
            id: v4(),
            title: 'react',
            url: 'www.google.com',
            pages: 250,
            year: 2011
        },
        {
            id: v4(),
            title: 'redux',
            url: 'www.google.com',
            pages: 30,
            year: 2017
        }
    ] as Publication[]
};

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

export const addPublication = (publication: Publication, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        publication.id = v4();
        fakeDb.publications.push(publication);
        return publication;
    });
};

export const deletePublication = (id: string, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        fakeDb.publications = fakeDb.publications.filter((pub: Publication) => pub.id !== id);
        return id;
    });
};

export const updatePublication = (pub: Publication, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
        let index = fakeDb.publications.findIndex((publication: Publication) => publication.id === pub.id);
        if (index >= 0) {
            fakeDb.publications[index] = pub;
        }
        return fakeDb.publications[index];

    });
};