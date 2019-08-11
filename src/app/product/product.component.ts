import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  confirmationString: string = "New product has been added!";
  isAdded: boolean = false;

  productObject: object = {};
  addNewProduct = function(product) {
    let nextId: number = Object.keys(localStorage).length + 1;
    this.productObject = {
      "id":nextId,
      "name":product.name,
      "color":product.color
    }
    
    localStorage.setItem(nextId.toString(),JSON.stringify(this.productObject));
    this.isAdded = true;
  }

  ngOnInit() {
  }

}
