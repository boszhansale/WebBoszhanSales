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
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in basket" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.phone }}</td>
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
            <h3 class="pt-1 mr-4">Когда доставить: {{ deliveryDate }}</h3>
            <v-btn
              :loading="loading"
              @click="selectDate"
              color="orange accent-3"
              prepend-icon="mdi-calendar"
            >
              Изменить
            </v-btn>
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
      returnPrice: 0,
      purchasePrice: 0,
      totalPrice: 0,
      deliveryDate: "2023-01-14",
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
    getBasket() {},
    createOrder() {
      this.loading = true;
      this.loading = false;
    },
    selectDate() {},
  },
  created() {
    this.getBasket();
    this.nameLabel = "Пользователь: " + localStorage.username;
    this.roleLabel = "Водитель: " + localStorage.driverName;
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