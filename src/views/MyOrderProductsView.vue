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
          <h1>Список продуктов</h1>
          <br />

          <v-table class="elevation-1">
            <thead>
              <tr>
                <th class="text-left">Название</th>
                <th class="text-left">Количество</th>
                <th class="text-left">Сумма покупки</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.name">
                <td>{{ item.product.name }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.all_price + " тг" }}</td>
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
  name: "MyOrdersProductsView",
  data() {
    return {
      url: "https://boszhan.kz",
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      products: [],
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
  },
  created() {
    this.nameLabel = "Пользователь: " + localStorage.username;
    this.roleLabel = "Водитель: " + localStorage.driverName;

    this.products = JSON.parse(localStorage.myOrderProducts);
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