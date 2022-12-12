<template>
  <v-app>
    <div id="mainDiv">
      <v-toolbar
        dark
        prominent
        src="https://instapik.ru/wp-content/uploads/2021/03/temno-krasnyy-fon-dlya-fotoshopa-abstraktnye-polosy.jpg"
      >
        <v-toolbar-title style="padding: 20px">
          <v-btn
            color="red darken-4"
            elevation="4"
            fab
            large
            v-on:click="showTime"
            ><v-icon dark> mdi-home </v-icon></v-btn
          >
          Первомайские деликатесы</v-toolbar-title
        >

        <v-spacer></v-spacer>
        <v-avatar color="orange lighten-5" id="avatar" size="90"
          ><span>KA</span></v-avatar
        >
        <div class="column mb-6">
          <p id="nameLabel">Kenjebek Alibek</p>
          <p id="positionLabel">Dnevnik</p>
        </div>

        <v-btn icon @click="exitAction">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
      <v-main>
        <v-container>
          <v-container fluid class="pa-10">
            <v-row align="center">
              <v-col cols="12" sm="12">
                <div class="text-center">
                  <div class="pa-5">
                    <v-btn
                      id="buttons"
                      block
                      color="red darken-1"
                      dark
                      @click="showTodayOrders"
                    >
                      <v-icon left> mdi-order-bool-ascending </v-icon>
                      Заказы на сегодня
                    </v-btn>
                  </div>
                </div>
                <div class="text-center">
                  <div class="pa-5">
                    <v-btn
                      id="buttons"
                      block
                      color="red darken-1"
                      dark
                      @click="showTomorrowOrders"
                    >
                      <v-icon left> mdi-order-bool-ascending </v-icon>
                      Заказы на завтра
                    </v-btn>
                  </div>
                </div>
                <div class="text-center">
                  <div class="pa-5">
                    <v-btn
                      id="buttons"
                      block
                      color="blue-grey darken-1"
                      dark
                      @click="showBalance"
                    >
                      <v-icon left> mdi-table-alert </v-icon>
                      Отчет по остаткам
                    </v-btn>
                  </div>
                </div>
                <div class="text-center">
                  <div class="pa-5">
                    <v-btn
                      id="buttons"
                      block
                      color="grey darken-1"
                      dark
                      @click="showIncoming"
                    >
                      <v-icon left> mdi-table-arrow-left </v-icon>
                      Входящие перемещения
                    </v-btn>
                  </div>
                </div>
                <div class="text-center">
                  <div class="pa-5">
                    <v-btn
                      id="buttons"
                      block
                      color="grey darken-1"
                      dark
                      @click="showOutbound"
                    >
                      <v-icon left> mdi-table-arrow-right </v-icon>
                      Исходящие перемещения
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
  
  <script>
export default {
  name: "HomeView",
  data() {
    return {};
  },
  methods: {
    exitAction() {
      localStorage.isLogedIn = false;
      this.$router.push("/login");
    },
    showTomorrowOrders() {
      this.$router.push("/orders/tomorrow");
    },
    showTodayOrders() {
      this.$router.push("/orders/today");
    },
    showTime() {
      this.$router.push("/time");
    },
    showIncoming() {
      this.$router.push("/incoming");
    },
    showOutbound() {
      this.$router.push("/outbound");
    },
    showBalance() {
      this.$router.push("/balance");
    },
  },
  created() {},
  mounted() {
    if (localStorage.isLogedIn == "false") {
      this.$router.push("/login");
    }
  },
};
</script>
  
  
  <style scoped>
#mainDiv {
  font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
  background-image: url("https://boszhan.com/wp-content/uploads/2020/12/HEADER-AMG-COLD-STORES-MALTA-1920x800-1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
}

#avatar {
  margin: 10px;
  color: red;
  font-weight: bold;
  font-size: 24px;
}

#nameLabel {
  font-weight: bold;
  font-size: 18px;
  padding: 30px 40px 0px 10px;
}

#positionLabel {
  font-weight: bold;
  font-size: 16px;
  padding: 0px 40px 10px 10px;
}

#buttons {
  height: 120px;
}
</style>