import { Bundle } from "./Bundle";
import { Collection } from "./Collection";
import { Season } from "./Season";

export interface Item {
    id: number;
    name: string;
    location: string;
    bundleId: number;

    isCollected: boolean;
    seasons: Season[];

    isNotNeeded: boolean;

    collection: Collection;
    bundle: Bundle;

}