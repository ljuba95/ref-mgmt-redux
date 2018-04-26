enum ActionTypes {
    DEFAULT = 'DEFAULT',
    PUBLICATIONS_FETCHED = 'PUBLICATIONS_FETCHED'
}

export default ActionTypes;

// Treba da se dogovorimo oko izgleda akcije, moze da bude {type: ActionTypes, payload: any}

export interface ActionType {
    type: ActionTypes;
    [propName: string]: any;
}