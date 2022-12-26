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
          <h1>Список юр. лиц</h1>
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
          <v-table class="elevation-1">
            <thead>
              <tr>
                <th class="text-left">Статус</th>
                <th class="text-left">Название юр. лица</th>
                <th class="text-left">Прайс</th>
                <th class="text-left">Тип оплаты</th>
                <th class="text-left">Долг</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in displayedList"
                :key="item.name"
                v-on:click="showMarkets(item.id, item.enabled)"
              >
                <td>{{ item.enabled == 1 ? "" : "Заблокирован" }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price_type.name }}</td>
                <td>{{ item.payment_type.name }}</td>
                <td>{{ item.debt }}</td>
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
  name: "ListOfLegalEntitiesView",
  data() {
    return {
      url: "http://boszhan.kz",
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      searchTextField: "",
      counteragents: [],
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
    showMarkets(id, status) {
      if (status == 1) {
        localStorage.counteragentId = id.toString();
        this.$router.push({ name: "legal.markets" });
      }
    },
    getCounteragents() {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
      };
      this.axios
        .get(this.url + "/api/salesrep/counteragent", config)
        .then((response) => {
          this.counteragents = response.data;
          this.displayedList = response.data;
          console.log(this.counteragents[0]);
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
      for (var i in this.counteragents) {
        if (
          this.counteragents[i].name
            .toLowerCase()
            .includes(this.searchTextField.toLowerCase())
        ) {
          this.displayedList.push(this.counteragents[i]);
        }
      }
    },
  },
  created() {
    this.getCounteragents();
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