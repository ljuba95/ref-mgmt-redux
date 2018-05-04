export enum AuthorActionTypes {
    DEFAULT = 'DEFAULT',
}

export interface AuthorActionType {
    type: AuthorActionTypes;
    [propName: string]: any;
}