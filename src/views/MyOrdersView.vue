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
          <h1>Список моих заказов</h1>
          <br />

          <v-table class="elevation-1">
            <thead>
              <tr>
                <th class="text-left">ID заказа</th>
                <th class="text-left">ID магазина</th>
                <th class="text-left">Название</th>
                <th class="text-left">Сумма покупки</th>
                <th class="text-left">Удаление</th>
                <th class="text-left">Показать</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in myOrders" :key="item.name">
                <td>{{ item.id }}</td>
                <td>{{ item.store_id }}</td>
                <td>{{ item.store.name }}</td>
                <td>{{ item.purchase_price + " тг" }}</td>
                <td>
                  <v-icon @click="deleteOrder(item.id)">mdi-delete</v-icon>
                </td>
                <td>
                  <v-icon @click="showProducts(item.baskets)">mdi-cart</v-icon>
                </td>
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
  name: "MyOrdersView",
  data() {
    return {
      url: "https://boszhan.kz",
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      myOrders: [],
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
    showMarketsPhys() {
      this.$router.push("/phys/markets");
    },
    showProducts(baskets) {
      localStorage.myOrderProducts = JSON.stringify(baskets);

      this.$router.push("/my/order/products");
    },
    getMyOrders() {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
      };
      this.axios
        .get(this.url + "/api/salesrep/order", config)
        .then((response) => {
          this.myOrders = response.data;
        })
        .catch((error) => {
          console.log(JSON.parse(error.response.request.response));
        });
    },
    deleteOrder(orderId) {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
      };

      this.axios
        .delete(this.url + "/api/salesrep/order/" + orderId.toString(), config)
        .then((response) => {
          console.log(response.data);
          this.getMyOrders();
        })
        .catch((error) => {
          console.log(JSON.parse(error.response.request.response));
        });
    },
  },
  created() {
    this.nameLabel = "Пользователь: " + localStorage.username;
    this.roleLabel = "Водитель: " + localStorage.driverName;

    this.getMyOrders();
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