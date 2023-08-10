import { Bundle } from "./Bundle";

export interface Collection {
    id: number;
    name: string;
    reward: string;
    
    bundles: Bundle[];
}