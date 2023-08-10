import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Collection } from "../Models/Collection";
import { Farm } from "../Models/Farm";
import { FarmItem } from "../Models/FarmItem";

@Injectable({
	providedIn: 'root',
})
export class BundleService {
	constructor(private http: HttpClient) { }

	ListFarms(){
		return this.http.get<Farm[]>(environment.apiUrl() + 'api/Bundle/ListFarms/')
	}

	GetCollections(FarmId: number){
		return this.http.get<Collection[]>(environment.apiUrl() + 'api/Bundle/GetCollections/?FarmId=' + FarmId);
	}

	UpdateFarmItem(FarmItem: FarmItem){
		return this.http.post(environment.apiUrl() + 'api/Bundle/UpdateFarmItem', FarmItem)
	}

}