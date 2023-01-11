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
        <v-container>
          <v-container fluid class="pa-10">
            <v-row align="center">
              <v-col cols="12" sm="12">
                <div class="text-center">
                  <div class="pa-10">
                    <v-img src="../assets/images/logo.png" id="logo"></v-img>
                  </div>
                  <h3>
                    Bız bar yqylasymyzben jäne tolyq jauapkerşılıgımızben kün
                    saiyn adamdar tañdaityn önımderdı daiyndaimyz
                  </h3>
                  <br />

                  <h3>
                    Мы с душой и полной ответственностью создаем продукты,
                    которые каждый день выбирают люди
                  </h3>
                </div>
                <div class="text-center">
                  <div class="pa-5">
                    <v-btn
                      id="buttons"
                      color="orange accent-3"
                      dark
                      @click="dialog = true"
                    >
                      <v-icon left> mdi-order-bool-ascending </v-icon>
                      Каталог
                    </v-btn>
                  </div>
                </div>
                <div class="text-center">
                  <div class="pa-5">
                    <v-btn
                      id="buttons"
                      color="orange accent-3"
                      dark
                      @click="dialog = true"
                    >
                      <v-icon left> mdi-order-bool-ascending </v-icon>
                      Мои заказы
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-main>
    </div>
    <v-col align-self="center">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Выберите категорию</span>
            <v-spacer></v-spacer>
            <v-menu bottom left> </v-menu>
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange accent-3" text @click="showMarketsPhys">
              Физ лицо
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="orange accent-3" text @click="showLegalEntities">
              Юр лицо
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="black" text @click="dialog = false"> Закрыть </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-app>
</template>
  
<script>
import colors from "vuetify/lib/util/colors";

export default {
  name: "HomeView",
  data() {
    return {
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      dialog: false,
      nameLabel: "Name",
      roleLabel: "Role",
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
    showLegalEntities() {
      this.$router.push("/legal");
    },
  },
  created() {
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

#buttons {
  height: 100px;
  min-width: 600px;
}

#logo {
  margin: 0 auto;
  width: 40%;
}
</style>