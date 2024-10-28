import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-catagory-item',
  templateUrl: './catagory-item.component.html',
  styleUrls: ['./catagory-item.component.css']
})
export class CatagoryItemComponent implements OnInit {

  @Input() name:string;
  @Input() imageURL: string;

  constructor() { }

  ngOnInit(): void {
  }

}
