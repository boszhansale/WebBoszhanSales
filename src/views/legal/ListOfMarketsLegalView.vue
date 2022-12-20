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
        <v-container fluid class="pa-10">
          <v-row>
            <v-text-field
              class="ma-5"
              label="Название"
              variant="solo"
            ></v-text-field>
            <v-btn
              stacked
              prepend-icon="mdi-magnify"
              id="searchButton"
              class="ma-5"
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
                v-for="item in markets"
                :key="item.name"
                v-on:click="showProductList"
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
  name: "ListOfMarketsLegalView",
  data() {
    return {
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      markets: [
        {
          name: "Frozen Yogurt",
          address: "Abaya 200",
          phone: "8757848444",
        },
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
    showMarketsPhys() {
      this.$router.push("/phys/markets");
    },
  },
  created() {},
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