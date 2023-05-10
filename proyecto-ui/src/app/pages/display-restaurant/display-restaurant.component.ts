import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared/interfaces/product';

import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-display-restaurant',
  templateUrl: './display-restaurant.component.html',
  styleUrls: ['./display-restaurant.component.scss']
})
export class DisplayRestaurantComponent {
  name: String = "";
  description: String = "";
  type: String = "";
  location: String = "";
  image: String = "";
  products: Array<Product> = [];
  user: Array<User> = [];

  idRestaurant: String = "";
  idCustomer: String = "";
  idOrder: String = "";

  constructor(private chatS: ChatService ,private router:Router, private sharedDataService: SharedDataService, private restaurantService: RestaurantService, private orderService: OrderService) {
      this.idRestaurant = this.sharedDataService.getRestaurant();
      this.idCustomer = this.sharedDataService.getCustomer();
      this.idOrder = this.sharedDataService.getOrder();
      this.user[0] = sharedDataService.getUser();

      this.restaurantService.getRestaurant(this.idRestaurant).subscribe((response: any) => {
        this.name = response.name;
        this.description = response.description;
        this.type = response.type;

        this.sharedDataService.setTypeRestaurant(this.type);

        this.location = response.location;
        this.image = response.image;

        this.products = response.products;
    });
  }

  addOrder(id: String) {    
    if(this.idCustomer != "") {
      let index = this.products.findIndex(item => item._id == id);
      let product = this.products[index];

      if(this.idOrder == '') {
        let body = {
          customerId: this.idCustomer, 
          restaurantId: this.idRestaurant, 
          total: product.Price,
          product: product._id,
          quantity: 1
        };

        this.orderService.createOrder(body).subscribe((response: any) => {
          this.sharedDataService.setOrder(response.order._id);
          this.router.navigate(['/display_order']);
        });
      }
      else {
        this.orderService.getOrder(this.idOrder).subscribe((response: any) => {
          if(response.restaurantId == this.idRestaurant) {
            let products = response.products;
            let index = undefined;
            
            for(let i = 0 ; i < products.length ; i++) {
              if(products[i].product._id == id) {
                index = i;
                break;
              }
            }

            if(index == undefined) {
              products.push({product: id, quantity: 1});
            }
            else {
              products[index].quantity++;
            }

            let body = {products: products, quantity: ++response.quantity, total: response.total + product.Price};

            this.orderService.updateOrder(this.idOrder, body).subscribe((response: any) => {
              this.router.navigate(['/display_order']);
            });
          }
          else {
            alert("Ya tienes una orden activa.\nNOTA: solo se pueden ingresar productos del mismo restaurante")
          }
        });
      }
    }
    else {
      alert("Es necesario iniciar sesión");
    }
    
  }



  prepareChat(){
    if(this.user[0] != undefined){
      this.sharedDataService.setOrigin("display_restaurant");


      let body = JSON.parse('{"MyID": "' + this.user[0]._id +'", "ItID": "' + this.idRestaurant + '"}');
      this.chatS.getChat(body).subscribe((response: any) => {
        if(response.length == 0){ //No hay chat aun
          
          let bodytrue = JSON.parse('{"customerId": "' + this.user[0]._id +'", "restaurantId": "' + this.idRestaurant + '"}');
  
          this.chatS.createChat(bodytrue).subscribe((response: any) => {
            this.router.navigate(['/chat']);
              });
  
        }else{ //ya hay chat
          this.router.navigate(['/chat']);
        }
      });
    }else{
      this.router.navigate(['/login']);
    }

    



  }


  }
