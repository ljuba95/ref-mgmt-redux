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
    return delay(delayMs).then(() =>  fakeDb.publications );
};

export const addPublication = (publication: Publication, delayMs: number = delayDefault) => {
    return delay(delayMs).then(() => {
              fakeDb.publications.push(publication);
              return publication;
    });
};