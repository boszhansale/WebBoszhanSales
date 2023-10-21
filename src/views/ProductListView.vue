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
      <v-main>
        <div class="pa-10">
          <v-row>
            <h1 class="ml-5">{{ storeName }}</h1>
            <v-btn
              icon
              @click="showBasket"
              class="ml-5"
              color="orange accent-3"
            >
              <v-icon color="white">mdi-basket</v-icon>
            </v-btn>
          </v-row>

          <br />
          <v-row>
            <v-text-field
              class="ma-5"
              label="Поиск..."
              variant="underlined"
              v-model="searchTextField"
            ></v-text-field>
            <v-btn
              stacked
              prepend-icon="mdi-magnify"
              id="searchButton"
              class="ma-5"
              v-on:click="searchByName"
            >
              Поиск
            </v-btn>
          </v-row>
          <br />
          <div>
            <v-row
              no-gutters
              style="flex-wrap: nowrap"
              id="productAndCategoryRow"
            >
              <v-col cols="3" class="flex-grow-0 flex-shrink-0">
                <v-card
                  class="pa-2 overflow-auto"
                  max-height="40%"
                  min-width="200px"
                  outlined
                  tile
                  id="categoryCard"
                >
                  <v-list>
                    <v-list-subheader
                      v-for="(item, i) in categories"
                      :key="i"
                      :value="item"
                      >{{ item.name }}
                      <v-list-item
                        v-for="(subitem, j) in item.categories"
                        :key="j"
                        :value="subitem"
                        active-color="orange accent-3"
                        @click="chooseCategory(subitem.id)"
                      >
                        <template v-slot:prepend>
                          <v-icon>mdi-basket</v-icon>
                        </template>
                        <v-list-item-title
                          v-text="subitem.name"
                        ></v-list-item-title>
                      </v-list-item>
                    </v-list-subheader>
                  </v-list>
                </v-card>
              </v-col>
              <div style="width: 20px"></div>
              <v-col
                cols="1"
                style="min-width: 100px; max-width: 100%"
                class="flex-grow-1 flex-shrink-0"
              >
                <v-row style="flex-wrap: wrap">
                  <v-card
                    class="ma-2"
                    max-width="320"
                    v-for="(item, k) in displayedList"
                    :key="k"
                    :value="item"
                  >
                    <v-img
                      v-bind:src="
                        item.images != []
                          ? item.images[0] != null
                            ? item.images[0].path
                            : 'https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg'
                          : 'https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg'
                      "
                      height="300px"
                      width="320px"
                      :key="k"
                      cover
                      class="scale"
                      ><template v-slot:placeholder>
                        <div
                          class="d-flex align-center justify-center fill-height"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey-lighten-4"
                          ></v-progress-circular>
                        </div> </template
                    ></v-img>

                    <v-card-title>
                      {{ item.name }}
                    </v-card-title>

                    <v-card-subtitle>
                      {{ prices[k] }} тг/{{ item.measure == 2 ? "кг" : "шт" }}
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn
                        v-bind:color="item.return == 1 ? 'red' : 'grey'"
                        prepend-icon="mdi-basket"
                        v-bind:variant="
                          this.basketReturns.filter(
                            (e) => e['product'].id == item.id
                          ).length > 0
                            ? 'tonal'
                            : 'text'
                        "
                        @click="checkProduct(k, 1)"
                      >
                        Возврат
                      </v-btn>

                      <v-spacer></v-spacer>

                      <v-btn
                        v-bind:color="item.purchase == 1 ? 'green' : 'grey'"
                        prepend-icon="mdi-basket"
                        v-bind:variant="
                          this.basket.filter((e) => e['product'].id == item.id)
                            .length > 0
                            ? 'tonal'
                            : 'text'
                        "
                        @click="checkProduct(k, 0)"
                      >
                        В корзину
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <h1 v-show="displayedList.length == 0" class="ma-10">
                    Пусто...
                  </h1>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Введите количество
                </v-card-title>

                <v-row class="pa-10">
                  <v-text-field
                    label="Количество"
                    suffix="кг/шт"
                    variant="underlined"
                    v-model="countTextField"
                  ></v-text-field>
                </v-row>

                <v-row v-if="dialogBasketType == 1" class="px-10">
                  <v-select
                    v-model="selectedReturnRefund"
                    label="Выберите причину возврата"
                    :items="returnRefunds"
                    variant="underlined"
                    item-title="causeText"
                    item-value="id"
                  ></v-select>
                </v-row>

                <v-row v-if="selectedReturnRefund == 10" class="pa-10">
                  <v-text-field
                    label="Причина"
                    variant="underlined"
                    v-model="causeText"
                  ></v-text-field>
                </v-row>

                <br />
                <br />

                <v-divider></v-divider>

                <v-card-actions class="py-5">
                  <v-spacer></v-spacer>
                  <v-btn color="orange accent-3" text @click="dialog = false">
                    Отмена
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="orange accent-3" text @click="addToBasket">
                    Добавить
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <v-snackbar v-model="snackbar">
            {{ snackbarText }}

            <template v-slot:actions>
              <v-btn
                color="orange accent-3"
                variant="text"
                @click="snackbar = false"
              >
                Закрыть
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </v-main>
    </div>
  </v-app>
</template>
  
  <script>
import colors from "vuetify/lib/util/colors";
export default {
  name: "ProductListView",
  data() {
    return {
      url: "https://boszhan.kz",
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      storeName: "",
      searchTextField: "",
      products: [],
      displayedList: [],
      selectedItem: 1,
      categories: [],
      prices: [],
      dialog: false,
      dialogBasketType: 0,
      countTextField: "1.0",
      snackbar: false,
      snackbarText: `Введите правильно количество!`,
      thisPrice: 0,
      basket: [],
      basketReturns: [],
      choosedProductIndex: 0,
      selectedReturnRefund: 0,
      causeText: "",
      returnRefunds: [
        { causeText: "Выберите причину", id: 0 },
        { causeText: "По сроку годности", id: 1 },
        { causeText: "По сроку годности более 10 дней", id: 2 },
        { causeText: "Белая жидкость", id: 3 },
        { causeText: "Блок продаж по решению ДР", id: 4 },
        {
          causeText: "Возврат конечного потребителя/скрытый брак",
          id: 5,
        },
        { causeText: "Низкие продажи", id: 6 },
        { causeText: "Переход на договор (с ФЗ на ЮЛ)", id: 7 },
        {
          causeText:
            "Поломка оборудования покупателя/закрытие магазина Покупателя",
          id: 8,
        },
        { causeText: "Развакуум", id: 9 },
        { causeText: "Прочее", id: 10 },
      ],
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
    chooseCategory(categoryId) {
      this.getProducts(categoryId);
    },
    showBasket() {
      this.$router.push("/basket");
    },
    getCategories() {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
      };
      this.axios
        .get(this.url + "/api/brand", config)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(JSON.parse(error.response.request.response));
          this.errorLabel = true;
          this.countDown = 5;
          this.countDownTimer();
        });
    },

    getProducts(categoryId) {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
      };
      this.axios
        .get(this.url + "/api/product?category_id=" + categoryId, config)
        .then((response) => {
          this.products = response.data;
          this.displayedList = [];
          this.prices = [];
          for (var i = 0; i < this.products.length; i++) {
            if (localStorage.counteragentDiscount != 0) {
              this.thisPrice =
                this.products[i].prices.filter(
                  (e) => e["price_type_id"] == localStorage.priceTypeId
                )[0].price *
                ((100 - localStorage.counteragentDiscount) / 100);
            } else {
              if (localStorage.marketDiscount != 0) {
                this.thisPrice =
                  this.products[i].prices.filter(
                    (e) => e["price_type_id"] == localStorage.priceTypeId
                  )[0].price *
                  ((100 - localStorage.marketDiscount) / 100);
              } else {
                if (this.products[i].discount != 0) {
                  this.thisPrice =
                    this.products[i].prices.filter(
                      (e) => e["price_type_id"] == localStorage.priceTypeId
                    )[0].price *
                    ((100 - this.products[i].discount) / 100);
                } else {
                  this.thisPrice = this.products[i].prices.filter(
                    (e) => e["price_type_id"] == localStorage.priceTypeId
                  )[0].price;
                }
              }
            }

            if (this.products[i]["counteragent_prices"] != null) {
              for (
                var j = 0;
                j < this.products[i]["counteragent_prices"].length;
                j++
              ) {
                if (
                  this.products[i]["counteragent_prices"][j][
                    "counteragent_id"
                  ] == localStorage.counteragentId
                ) {
                  this.thisPrice =
                    this.products[i]["counteragent_prices"][j]["price"];
                }
              }
            }

            if (this.thisPrice != 0) {
              this.displayedList.push(this.products[i]);
              this.prices.push(this.thisPrice);
            }
          }
        })
        .catch((error) => {
          console.log(JSON.parse(error.response.request.response));
          this.errorLabel = true;
          this.countDown = 5;
          this.countDownTimer();
        });
    },

    searchByName() {
      this.displayedList = [];
      this.prices = [];
      for (var i in this.products) {
        if (
          this.products[i].name
            .toLowerCase()
            .includes(this.searchTextField.toLowerCase())
        ) {
          if (localStorage.counteragentDiscount != 0) {
            this.thisPrice =
              this.products[i].prices.filter(
                (e) => e["price_type_id"] == localStorage.priceTypeId
              )[0].price *
              ((100 - localStorage.counteragentDiscount) / 100);
          } else {
            if (localStorage.marketDiscount != 0) {
              this.thisPrice =
                this.products[i].prices.filter(
                  (e) => e["price_type_id"] == localStorage.priceTypeId
                )[0].price *
                ((100 - localStorage.marketDiscount) / 100);
            } else {
              if (this.products[i].discount != 0) {
                this.thisPrice =
                  this.products[i].prices.filter(
                    (e) => e["price_type_id"] == localStorage.priceTypeId
                  )[0].price *
                  ((100 - this.products[i].discount) / 100);
              } else {
                this.thisPrice = this.products[i].prices.filter(
                  (e) => e["price_type_id"] == localStorage.priceTypeId
                )[0].price;
              }
            }
          }

          if (this.products[i]["counteragent_prices"] != null) {
            for (
              var j = 0;
              j < this.products[i]["counteragent_prices"].length;
              j++
            ) {
              if (
                this.products[i]["counteragent_prices"][j]["counteragent_id"] ==
                localStorage.counteragentId
              ) {
                this.thisPrice =
                  this.products[i]["counteragent_prices"][j]["price"];
              }
            }
          }

          if (this.thisPrice != 0) {
            this.displayedList.push(this.products[i]);
            this.prices.push(this.thisPrice);
          }
        }
      }
    },

    checkProduct(index, type) {
      if (type == 1) {
        if (
          this.basketReturns.filter(
            (e) => e["product"].id == this.displayedList[index].id
          ).length == 0
        ) {
          if (this.displayedList[index].return == 1) {
            this.dialogBasketType = 1;
            this.choosedProductIndex = index;
            this.dialog = true;
          }
        } else {
          var item = this.basketReturns.filter(
            (e) => e["product"] == this.displayedList[index]
          )[0];
          this.basketReturns.splice(this.basketReturns.indexOf(item), 1);
        }
      } else {
        if (
          this.basket.filter(
            (e) => e["product"].id == this.displayedList[index].id
          ).length == 0
        ) {
          if (this.displayedList[index].purchase == 1) {
            this.dialogBasketType = 0;
            this.choosedProductIndex = index;
            this.dialog = true;
          }
        } else {
          var item2 = this.basket.filter(
            (e) => e["product"] == this.displayedList[index]
          )[0];
          this.basket.splice(this.basket.indexOf(item2), 1);
        }
      }

      localStorage.basket = JSON.stringify(this.basket);
      localStorage.basketReturns = JSON.stringify(this.basketReturns);
    },

    addToBasket() {
      if (this.countTextField == "" || parseFloat(this.countTextField) == 0) {
        this.snackbar = true;
      } else {
        if (this.dialogBasketType == 1) {
          if (this.displayedList[this.choosedProductIndex].measure == 2) {
            if (!Number.isNaN(parseFloat(this.countTextField))) {
              if (this.selectedReturnRefund != 0) {
                this.basketReturns.push({
                  product: this.displayedList[this.choosedProductIndex],
                  type: this.dialogBasketType,
                  price: this.prices[this.choosedProductIndex],
                  count: parseFloat(this.countTextField),
                  reason_refund_id: this.selectedReturnRefund,
                  comment: this.causeText,
                });
                this.selectedReturnRefund = 0;
                this.countTextField = "1.0";

                this.dialog = false;
              }
            }
          } else {
            if (Number.isInteger(parseInt(this.countTextField))) {
              if (this.selectedReturnRefund != 0) {
                this.basketReturns.push({
                  product: this.displayedList[this.choosedProductIndex],
                  type: this.dialogBasketType,
                  price: this.prices[this.choosedProductIndex],
                  count:
                    parseInt(this.countTextField) == 0
                      ? 1
                      : parseInt(this.countTextField),
                  reason_refund_id: this.selectedReturnRefund,
                  comment: this.causeText,
                });
                this.selectedReturnRefund = 0;
                this.countTextField = "1.0";

                this.dialog = false;
              }
            }
          }
        } else {
          if (this.displayedList[this.choosedProductIndex].measure == 2) {
            if (!Number.isNaN(parseFloat(this.countTextField))) {
              this.basket.push({
                product: this.displayedList[this.choosedProductIndex],
                type: this.dialogBasketType,
                price: this.prices[this.choosedProductIndex],
                count: parseFloat(this.countTextField),
              });
              this.countTextField = "1.0";

              this.dialog = false;
            }
          } else {
            if (Number.isInteger(parseInt(this.countTextField))) {
              this.basket.push({
                product: this.displayedList[this.choosedProductIndex],
                type: this.dialogBasketType,
                price: this.prices[this.choosedProductIndex],
                count:
                  parseInt(this.countTextField) == 0
                    ? 1
                    : parseInt(this.countTextField),
              });
              this.countTextField = "1.0";

              this.dialog = false;
            }
          }
        }

        localStorage.basket = JSON.stringify(this.basket);
        localStorage.basketReturns = JSON.stringify(this.basketReturns);
      }
    },
  },
  created() {
    this.nameLabel = "Пользователь: " + localStorage.username;
    this.roleLabel = "Водитель: " + localStorage.driverName;
    this.storeName = "Торговая точка: " + localStorage.storeName;

    if (localStorage.basket != "undefined" && localStorage.basket != null) {
      this.basket = JSON.parse(localStorage.basket);
    }

    if (
      localStorage.basketReturns != "undefined" &&
      localStorage.basketReturns != null
    ) {
      this.basketReturns = JSON.parse(localStorage.basketReturns);
    }

    this.getCategories();
    this.getProducts(23);
  },
  mounted() {
    if (localStorage.isLogedIn == "false") {
      this.$router.push("/auth");
    }
  },
};
</script>
  
  
  <style scoped>
html {
  overflow: hidden !important;
}

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

#productAndCategoryRow {
  max-height: 80%;
}

.scale {
  transition: 1s; /* Время эффекта */
}
.scale:hover {
  transform: scale(2); /* Увеличиваем масштаб */
}
</style>