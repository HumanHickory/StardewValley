import { Item } from "./Item";

export interface Bundle {
    id: number;
    name: string;
    collectionId: number;
    numberRequired: number;

    items: Item[];
    isComplete: boolean;
}