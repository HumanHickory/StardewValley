import { Component, Input, OnInit } from '@angular/core';
import { Farm } from 'src/app/Models/Farm';
import { FarmItem } from 'src/app/Models/FarmItem';
import { Item } from 'src/app/Models/Item';
import { BundleService } from 'src/app/Services/BundleService';

@Component({
  selector: 'app-season-items',
  templateUrl: './season-items.component.html',
  styleUrls: ['./season-items.component.css']
})
export class SeasonItemsComponent implements OnInit {

  constructor(private bundleService: BundleService) { }
  @Input() SeasonalItems: Item[];
  @Input() SelectedFarm: Farm;
  ngOnInit(): void {
  }

  UpdateFarmItem(item: Item){
    const farm: FarmItem = {
      farmId: this.SelectedFarm.id,
      itemId: item.id,
      isCollected: item.isCollected  
    }

    this.bundleService.UpdateFarmItem(farm).subscribe(x => {
      console.log('success');
    });
  }

}
