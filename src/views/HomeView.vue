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
                  <p>Biz</p>
                </div>
                <div class="text-center">
                  <div class="pa-5">
                    <v-btn
                      id="buttons"
                      block
                      color="orange accent-3"
                      dark
                      @click="showCatalog"
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
                      block
                      color="orange accent-3"
                      dark
                      @click="showCatalog"
                    >
                      <v-icon left> mdi-order-bool-ascending </v-icon>
                      Каталог
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
import colors from "vuetify/lib/util/colors";

export default {
  name: "HomeView",
  data() {
    return {
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
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
    showCatalog() {
      this.$router.push("/orders/tomorrow");
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
  height: 120px;
}

#logo {
  margin: 0 auto;
  width: 50%;
}
</style>