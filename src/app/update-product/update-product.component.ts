import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id: number;
  lastKey: number;
  data: object = {};
  products = [];
  exists = false;
  productObject: object = {};
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private router: Router, private route: ActivatedRoute) { }

  updateProduct(product) {
    this.productObject = {
      "id": this.id,
      "name": product.name,
      "color": product.color
    };
    console.log("ID: got: "+this.id);
    localStorage.setItem(this.id.toString(), JSON.stringify(this.productObject));
    console.log("Data updated: "+localStorage.getItem(this.id.toString()));
    this.router.navigate(['/']);
  }

  getLastKey = function() {
    let tempArray = [];
    let arrayLength: number;
    let i: number = 1;
    let nextValue: Boolean = true;
    let invalidCount: number = 0;
    while(nextValue) {
      if(localStorage.getItem(i.toString())!= null) {
        tempArray.push(JSON.parse(localStorage.getItem(i.toString())));
      }
      else {
        invalidCount++;
      }

      if (invalidCount > 2){
          nextValue = false;
      }
      i++;
    }
    arrayLength = tempArray.length;
    let j:number = 0;
    this.lastKey = 0;
    while(j< arrayLength) {
      console.log("Loop: "+j)
      if(this.lastKey < tempArray[j].id) {
        this.lastKey = tempArray[j].id;
      }
      console.log("Key: "+this.lastKey);
      j++;
    }
  }

  getAllRecords = function() {
    this.getLastKey();
    let i:number = 1;
    while(i<= this.lastKey) {
      if(localStorage.getItem(i.toString()) !=null) {
        this.products.push(JSON.parse(localStorage.getItem(i.toString())));
      }
      i++;
    }
  }





  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.getAllRecords();

    for(var i = 0; i < this.products.length; i++) {
      if(parseInt(this.products[i].id) === this.id) {
        this.exists = true;
        this.data = this.products[i];
        break;
      }
      else {
        this.exists = false;
      }
    }
  }

}
