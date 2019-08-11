import { Component, OnInit } from '@angular/core';
import { products } from '../product-model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  
  id:number;
  lastKey: number;
  private headers = new Headers({'Content-Type': 'application/json'});
 
  data1 = {id: 1, name: "T-shirt",color:"White"};
  data2 = {id: 2, name: "Pant",color:"Blue"};
  data3 = {id: 3, name: "Hat",color:"Black"};

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

  products = [];
  putInitialData= function() {
    localStorage.setItem("1",JSON.stringify(this.data1));
    localStorage.setItem("2",JSON.stringify(this.data2));
    localStorage.setItem("3",JSON.stringify(this.data3));
    this.getLastKey();
    let i:number = 1;
    while(i<= this.lastKey) {
      if(localStorage.getItem(i.toString()) !=null) {
        this.products.push(JSON.parse(localStorage.getItem(i.toString())));
      }
      i++;
    }
  }

  addProductFromLocalStorageToArray = function() {
    this.getLastKey();
    this.products = [];
    let i:number = 1;

    while(i<= this.lastKey) {
      if(localStorage.getItem(i.toString()) !=null) {
        this.products.push(JSON.parse(localStorage.getItem(i.toString())));
      }
      i++;
    }
    
  }

  deleteProduct = function(id) {
    this.products = [];
    console.log(this.products.toString());
    this.getLastKey();
    if(confirm("Are you sure?")) {
      localStorage.removeItem(id.toString());
    }

    this.addProductFromLocalStorageToArray();
  }

  ngOnInit() {
    this.putInitialData();
  }

}
