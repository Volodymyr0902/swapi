import {SwapiResourceItem} from "./swapi-resource-item.interface";

export interface SwapiResource {
    count: number;
    next: string | null;
    results: SwapiResourceItem[]
}