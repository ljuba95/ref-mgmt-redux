enum ActionTypes {
    DEFAULT = 'DEFAULT',
    PUBLICATIONS_FETCHED = 'PUBLICATIONS_FETCHED',
    PUBLICATION_FETCHED = 'PUBLICATION_FETCHED',
    PUBLICATION_CREATED = 'PUBLICATION_CREATED',
    PUBLICATION_UPDATED = 'PUBLICATION_UPDATED',
    PUBLICATION_DELETED = 'PUBLICATION_DELETED',

}

export default ActionTypes;

// Treba da se dogovorimo oko izgleda akcije, moze da bude {type: ActionTypes, payload: any}

export interface ActionType {
    type: ActionTypes;
    [propName: string]: any;
}