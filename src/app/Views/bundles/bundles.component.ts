import { Component, OnInit } from '@angular/core';
import { Bundle } from 'src/app/Models/Bundle';
import { Collection } from 'src/app/Models/Collection';
import { Farm } from 'src/app/Models/Farm';
import { FarmItem } from 'src/app/Models/FarmItem';
import { Item } from 'src/app/Models/Item';
import { BundleService } from 'src/app/Services/BundleService';

@Component({
	selector: 'app-bundles',
	templateUrl: './bundles.component.html',
	styleUrls: ['./bundles.component.css']
})
export class BundlesComponent implements OnInit {

	Farms: Farm[] = [];
	SelectedFarm: Farm;
	Collections: Collection[] = [];
	ShowCollection: boolean = false;
	Tabs: string[] = ["Bundles", "Seasons", "Remaining Items"];
	SelectedTab = this.Tabs[0];
	SummerItems: Item[] = [];
	FallItems: Item[] = [];
	SpringItems: Item[] = [];
	WinterItems: Item[] = [];
	AllSeasonItems: Item[] = [];
	ShowSpinner: boolean = false;
	RemainingItems: Item[] = [];
	AllItems: Item[] = [];

	constructor(private bundleService: BundleService) { }

	ngOnInit(): void {
		this.ShowSpinner = true;

		this.bundleService.ListFarms().subscribe(farms => {
			this.Farms = farms;
			var farm = this.GetLocalStorageFarm();

			if (farm.id != null) {
				this.SelectedFarm = farm;
			} else {
				this.SelectedFarm = this.Farms[0];
			}

			this.GetCollections();
		});
	}

	GetCollections() {
		this.ShowSpinner = true;
		this.bundleService.GetCollections(this.SelectedFarm.id).subscribe(collections => {
			this.Collections = collections;
			//for some reason it was resetting the selected farm so I had to make sure to set it again. 
			this.SelectedFarm = this.GetLocalStorageFarm();
			this.Collections.forEach(collection => {
				collection.bundles.forEach(bundle => {
					bundle.items.forEach(item => {
						item.bundle = bundle;
						item.collection = collection;

						this.AllItems.push(item);
					});

					this.DetermineNumberSelected(bundle.id);
				});
			});
			this.ShowCollection = true;
			this.ShowSpinner = false;
		});
	}

	GetLocalStorageFarm(): Farm {
		const farm = JSON.parse(localStorage.getItem('farm'));
		return this.Farms.find(x => x.id == farm.id);
	}

	FarmSelected() {
		localStorage.setItem('farm', JSON.stringify(this.SelectedFarm));
		this.GetCollections();
	}

	UpdateFarmItem(item: Item, bundleId: number) {
		const farm: FarmItem = {
			farmId: this.SelectedFarm.id,
			itemId: item.id,
			isCollected: item.isCollected
		}

		this.bundleService.UpdateFarmItem(farm).subscribe(x => {
			this.DetermineNumberSelected(bundleId);
			if(this.SelectedTab == this.Tabs[2]){
				this.GetRemainingItems();
			}
		});
	}

	DetermineNumberSelected(bundleId: number) {
		this.Collections.forEach(collection => {
			collection.bundles.forEach(bundle => {
				let numberCollected = 0;
				if (bundle.id == bundleId) {
					bundle.items.forEach(item => {
						if (item.isCollected)
							numberCollected = numberCollected + 1;
					});

					if (numberCollected >= bundle.numberRequired) {
						bundle.isComplete = true;

						bundle.items.forEach(item => {
							if (!item.isCollected)
								item.isNotNeeded = true;
						});
					}
				}
			});
		});
	}

	SortSeaonalItems() {
		this.AllSeasonItems = [];
		this.SummerItems = [];
		this.FallItems = [];
		this.WinterItems = [];
		this.SpringItems = [];

		this.AllItems.forEach(item => {
			if (item.seasons.length == 4) {
				this.AllSeasonItems.push(item)
			} else {
				item.seasons.forEach(season => {
					if (season.id == 1) {
						this.SummerItems.push(item);
					} else if (season.id == 2) {
						this.FallItems.push(item);
					} else if (season.id == 3) {
						this.WinterItems.push(item);
					} else {
						this.SpringItems.push(item);
					}
				});
			}
		});

		this.SummerItems.sort((a, b) => a.name.localeCompare(b.name));
		this.FallItems.sort((a, b) => a.name.localeCompare(b.name));
		this.WinterItems.sort((a, b) => a.name.localeCompare(b.name));
		this.SpringItems.sort((a, b) => a.name.localeCompare(b.name));
		this.AllSeasonItems.sort((a, b) => a.name.localeCompare(b.name));
	}

	GetRemainingItems() {
		this.RemainingItems = [];
		this.AllItems.forEach(item => {
			if (!item.isCollected && !item.isNotNeeded)
				this.RemainingItems.push(item);
		});

		this.RemainingItems.sort((a, b) => a.name.localeCompare(b.name));
	}

	ToggleTabs(tab: string) {
		this.SelectedTab = tab;
		if (tab == this.Tabs[1]) {
			if (this.AllSeasonItems.length == 0) {
				this.SortSeaonalItems();
			}
		} else if (tab == this.Tabs[2]) {
			if (this.RemainingItems.length == 0) {
				this.GetRemainingItems();
			}
		}
	}

}
