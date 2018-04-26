export class Publication {
    private _id: string;
    private _title: string;
    private _url: string;
    private _pages: number;
    private _year: number;

    constructor(id: string, title: string, url: string, pages: number, year: number) {
        this._id = id;
        this._title = title;
        this._url = url;
        this._pages = pages;
        this._year = year;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get pages(): number {
        return this._pages;
    }

    set pages(value: number) {
        this._pages = value;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        this._year = value;
    }

    public string() {
        return `${this.year} - ${this.title}: ${this.pages} pages`;
    }
}