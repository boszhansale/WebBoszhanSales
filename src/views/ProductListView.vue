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
        <v-container fliud class="pa-10">
          <h1>Список продуктов</h1>
          <br />
          <v-row>
            <v-text-field
              class="ma-5"
              label="Поиск..."
              variant="solo"
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
          <v-container>
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
                    max-width="400"
                    v-for="(item, k) in displayedList"
                    :key="k"
                    :value="item"
                  >
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="250px"
                      width="400px"
                      cover
                    ></v-img>

                    <v-card-title> {{ item.name }} </v-card-title>

                    <v-card-subtitle>
                      {{ prices[k] }} тг/{{ item.measure == 2 ? "кг" : "шт" }}
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn color="red" prepend-icon="mdi-basket">
                        Возврат
                      </v-btn>

                      <v-spacer></v-spacer>

                      <v-btn color="green" prepend-icon="mdi-basket">
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
          </v-container>
        </v-container>
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
      url: "http://boszhan.kz",
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      searchTextField: "",
      products: [],
      displayedList: [],
      selectedItem: 1,
      categories: [],
      prices: [],
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
          this.displayedList = response.data;
          this.prices = [];
          for (var i = 0; i < this.displayedList.length; i++) {
            this.prices.push(this.displayedList[i].prices[0].price);
          }
          console.log(this.prices);
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
          this.displayedList.push(this.products[i]);
          this.prices.push(this.products[i].prices[0].price);
        }
      }
    },
  },
  created() {
    this.nameLabel = "Пользователь: " + localStorage.username;
    this.roleLabel = "Водитель: " + localStorage.driverName;
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
</style>