<template>
  <v-app>
    <div id="mainDiv">
      <v-toolbar color="orange accent-3" prominent>
        <v-toolbar-title style="padding: 20px">
          <v-btn color="white" elevation="4" fab large v-on:click="showHomePage"
            ><v-icon dark color="orange accent-3"> mdi-home </v-icon></v-btn
          >
          Первомайские деликатесы</v-toolbar-title
        >

        <v-spacer></v-spacer>
        <div class="column mb-6">
          <p id="nameLabel">{{ nameLabel }}</p>
          <p id="roleLabel">{{ roleLabel }}</p>
        </div>

        <v-btn icon @click="exitAction">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
      <v-main
        ><v-container fluid class="pa-10">
          <v-row>
            <h1 class="ml-5">Корзина</h1>
            <v-btn
              icon
              @click="showProducts"
              class="ml-5"
              color="orange accent-3"
            >
              <v-icon color="white">mdi-backburger</v-icon>
            </v-btn>
          </v-row>
          <br />
          <v-table class="elevation-1">
            <thead>
              <tr>
                <th class="text-left">Название</th>
                <th class="text-left">кл.</th>
                <th class="text-left">цена</th>
                <th class="text-left">итого</th>
                <th class="text-left">тип</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in basket" :key="i" :value="item" col>
                <td>{{ item.product.name }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.count * item.price }}</td>
                <td>
                  <v-chip color="green">
                    {{ "Покупка" }}
                  </v-chip>
                </td>
                <td>
                  <v-icon @click="deletePurchase(i)">mdi-delete</v-icon>
                </td>
              </tr>
              <tr
                v-for="(item2, j) in basketReturns"
                :key="j"
                :value="item2"
                col
              >
                <td>{{ item2.product.name }}</td>
                <td>{{ item2.count }}</td>
                <td>{{ item2.price }}</td>
                <td>{{ item2.count * item2.price }}</td>
                <td>
                  <v-chip color="red">
                    {{ "Возврат" }}
                  </v-chip>
                </td>
                <td>
                  <v-icon @click="deleteReturn(j)">mdi-delete</v-icon>
                </td>
              </tr>
            </tbody>
          </v-table>
          <br />
          <v-row>
            <v-spacer></v-spacer>
            <h3>Сумма покупок: {{ purchasePrice }} тг</h3>
            <v-spacer></v-spacer>
            <h3>Сумма возвратов: {{ returnPrice }} тг</h3>
            <v-spacer></v-spacer>
            <h3>Итого к оплате: {{ totalPrice }} тг</h3>
            <v-spacer></v-spacer>
          </v-row>
          <br />
          <hr />
          <br />
          <v-row>
            <v-spacer></v-spacer>
            <h3 class="pt-1 mr-4">Когда доставить:</h3>
            <input type="date" v-model="deliveryDate" />
            <!-- <v-btn
              :loading="loading"
              @click="selectDate"
              color="orange accent-3"
              prepend-icon="mdi-calendar"
            >
              Изменить
            </v-btn> -->
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              @click="createOrder"
              class="px-10"
              color="orange accent-3"
              prepend-icon="mdi-cart-variant"
            >
              Подтвердить заказ
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          <div id="alertLogin">
            <v-alert v-if="errorLabel" dismissible type="error">
              Ошибка!!!
            </v-alert>
          </div>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
    
  <script>
import colors from "vuetify/lib/util/colors";

export default {
  name: "BasketView",
  data() {
    return {
      url: "http://boszhan.kz",
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      loading: false,
      basket: [],
      basketReturns: [],
      returnPrice: 0,
      purchasePrice: 0,
      totalPrice: 0,
      deliveryDate: "",
      errorLabel: false,
      countDown: 5,
      sendedBasket: [],
    };
  },
  methods: {
    exitAction() {
      localStorage.isLogedIn = "false";
      this.$router.push("/auth");
    },
    showHomePage() {
      this.$router.push("/");
    },
    showProducts() {
      this.$router.push("/products");
    },
    createOrder() {
      if (this.totalPrice > 0) {
        this.loading = true;

        this.sendedBasket = [];

        for (var i = 0; i < this.basket.length; i++) {
          var tempDict = {};
          tempDict.product_id = this.basket[i]["product"]["id"];
          tempDict.count = this.basket[i]["count"];
          tempDict.type = 0;
          tempDict.name = this.basket[i]["product"]["name"];
          tempDict.price = this.basket[i]["price"];

          this.sendedBasket.push(tempDict);
        }

        for (var j = 0; j < this.basketReturns.length; j++) {
          var tempDict2 = {};
          tempDict2.product_id = this.basketReturns[j]["product"]["id"];
          tempDict2.count = this.basketReturns[j]["count"];
          tempDict2.type = 1;
          tempDict2.name = this.basketReturns[j]["product"]["name"];
          tempDict2.price = this.basketReturns[j]["price"];
          tempDict2.reason_refund_id =
            this.basketReturns[j]["reason_refund_id"];
          if (this.basketReturns[j]["comment"] != null) {
            tempDict2.comment = this.basketReturns[j]["comment"];
          } else {
            tempDict2.comment = " ";
          }

          this.sendedBasket.push(tempDict2);
        }

        let config = {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
        const body = {
          store_id: localStorage.storeId,
          baskets: this.sendedBasket,
          mobile_id: new Date().valueOf(),
          delivery_date: this.deliveryDate,
        };
        console.log(body);

        this.axios
          .post(this.url + "/api/salesrep/order", body, config)
          .then((response) => {
            console.log(response.data);
            localStorage.basket = "[]";
            localStorage.basketReturns = "[]";
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(JSON.parse(error.response.request.response));
            this.errorLabel = true;
            this.countDown = 5;
            this.countDownTimer();
          });

        this.loading = false;
      } else {
        this.errorLabel = true;
        this.countDown = 5;
        this.countDownTimer();
      }
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.errorLabel = false;
      }
    },

    selectDate() {},
    deletePurchase(index) {
      this.basket.splice(index, 1);
      localStorage.basket = JSON.stringify(this.basket);
      this.calculatePrice();
    },
    deleteReturn(index) {
      this.basketReturns.splice(index, 1);
      localStorage.basketReturns = JSON.stringify(this.basketReturns);
      this.calculatePrice();
    },
    calculatePrice() {
      this.purchasePrice = 0;

      for (var i = 0; i < this.basket.length; i++) {
        this.purchasePrice += this.basket[i].count * this.basket[i].price;
      }

      this.returnPrice = 0;

      for (var j = 0; j < this.basketReturns.length; j++) {
        this.returnPrice +=
          this.basketReturns[j].count * this.basketReturns[j].price;
      }

      this.totalPrice = this.purchasePrice - this.returnPrice;
    },
  },
  created() {
    this.nameLabel = "Пользователь: " + localStorage.username;
    this.roleLabel = "Водитель: " + localStorage.driverName;

    if (localStorage.basket != "undefined" && localStorage.basket != null) {
      this.basket = JSON.parse(localStorage.basket);
    }

    if (
      localStorage.basketReturns != "undefined" &&
      localStorage.basketReturns != null
    ) {
      this.basketReturns = JSON.parse(localStorage.basketReturns);
    }

    this.calculatePrice();

    this.deliveryDate = new Date().toISOString().slice(0, 10);
  },
  mounted() {
    if (localStorage.isLogedIn == "false") {
      this.$router.push("/auth");
    }
  },
};
</script>
    
    
  <style scoped>
#mainDiv {
  font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
  background-image: url("../assets/images/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
}

#nameLabel {
  font-weight: bold;
  font-size: 18px;
  padding: 30px 40px 0px 10px;
}

#roleLabel {
  font-size: 16px;
  padding: 0px 40px 10px 10px;
}
</style>