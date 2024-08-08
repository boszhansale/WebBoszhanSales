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
            <h1>Список торговых точек физ. лица</h1>
            <v-spacer></v-spacer>
            <v-btn
              prepend-icon="mdi-plus-circle"
              v-on:click="showCreatePage"
              class="ma-2"
            >
              Создать
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
          <v-table class="elevation-1">
            <thead>
              <tr>
                <th class="text-left">Название</th>
                <th class="text-left">Адрес</th>
                <th class="text-left">Номер телефона</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in displayedList"
                :key="item.name"
                v-on:click="showProducts(item.name, item.discount, item.id)"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.phone }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
  
<script>
import colors from "vuetify/lib/util/colors";
export default {
  name: "ListOfMarketsPhysView",
  data() {
    return {
      url: "https://boszhan.kz",
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      searchTextField: "",
      markets: [],
      displayedList: [],
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
    showCreatePage() {
      localStorage.counteragentId = 0;
      this.$router.push("/markets/create");
    },
    showProducts(storeName, discount, storeId) {
      localStorage.basket = "[]";
      localStorage.basketReturns = "[]";
      localStorage.storeName = storeName;
      localStorage.storeId = storeId;
      localStorage.counteragentId = 0;
      localStorage.counteragentDiscount = 0;
      localStorage.priceTypeId = 1;
      localStorage.marketDiscount = discount;
      this.$router.push("/products");
    },
    getMarkets() {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
      };
      this.axios
        .get(this.url + "/api/salesrep/store?counteragent=0", config)
        .then((response) => {
          // console.log("Полный ответ от сервера:", JSON.stringify(response.data, null, 2));
          this.markets = response.data;
          this.displayedList = response.data;
          // console.log("Первый элемент массива markets:", this.markets[0]);
        })
        .catch((error) => {
          // console.error("Ошибка при получении данных:", error);
          if (error.response) {
            // console.error("Данные ошибки:", error.response.data);
            // console.error("Статус ошибки:", error.response.status);
            // console.error("Заголовки ошибки:", error.response.headers);
          } else if (error.request) {
            // console.error("Запрос был сделан, но ответ не получен:", error.request);
          } else {
            // console.error("Ошибка при настройке запроса:", error.message);
          }
          this.errorLabel = true;
          this.countDown = 5;
          this.countDownTimer();
        });
    },
    searchByName() {
      this.displayedList = [];
      for (var i in this.markets) {
        if (
          this.markets[i].name
            .toLowerCase()
            .includes(this.searchTextField.toLowerCase())
        ) {
          this.displayedList.push(this.markets[i]);
        }
      }
    },
  },
  created() {
    this.getMarkets();
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
  background-image: url("../../assets/images/bg.png");
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