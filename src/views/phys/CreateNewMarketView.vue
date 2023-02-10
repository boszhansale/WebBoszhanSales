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
          <h1>Добавление торговой точки</h1>
          <br />

          <v-text-field
            class="ma-5"
            label="Название"
            variant="underlined"
            v-model="nameTextField"
          ></v-text-field>
          <v-text-field
            class="ma-5"
            label="Номер телефона (87071234567)"
            variant="underlined"
            v-model="phoneTextField"
          ></v-text-field>
          <v-text-field
            class="ma-5"
            label="БИН"
            variant="underlined"
            v-model="binTextField"
          ></v-text-field>
          <v-text-field
            class="ma-5"
            label="Адрес"
            variant="underlined"
            v-model="addressTextField"
          ></v-text-field>
          <br />

          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              prepend-icon="mdi-plus-circle"
              id="createButton"
              class="ma-2"
              v-on:click="saveButtonAction"
            >
              Создать
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>

          <br />

          <v-alert v-if="errorLabel" dismissible type="error">
            Ошибка!
          </v-alert>
          <v-alert v-if="successLabel" dismissible type="success">
            Торговая точка создана!
          </v-alert>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
    
  <script>
import colors from "vuetify/lib/util/colors";
export default {
  name: "CreateNewMarketView",
  data() {
    return {
      url: "https://boszhan.kz",
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      nameLabel: "Name",
      roleLabel: "Role",
      nameTextField: "",
      phoneTextField: "",
      binTextField: "",
      addressTextField: "",
      errorLabel: false,
      successLabel: false,
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
    createMarket() {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
      };
      const body = {
        name: this.nameTextField,
        phone: this.phoneTextField,
        address: this.addressTextField,
      };
      if (this.binTextField != "") {
        body["bin"] = this.binTextField;
      }
      if (localStorage.counteragentId != 0) {
        body["counteragent_id"] = localStorage.counteragentId;
      }
      this.axios
        .post(this.url + "/api/salesrep/store", body, config)
        .then(() => {
          this.nameTextField = "";
          this.phoneTextField = "";
          this.binTextField = "";
          this.addressTextField = "";

          this.successLabel = true;
          this.countDown = 5;
          this.countDownTimer();
        })
        .catch((error) => {
          console.log(JSON.parse(error.response.request.response));
          this.errorLabel = true;
          this.countDown = 5;
          this.countDownTimer();
        });
    },
    saveButtonAction() {
      if (
        this.nameTextField.length > 1 &&
        this.phoneTextField.length == 11 &&
        this.addressTextField.length > 1
      ) {
        this.createMarket();
      } else {
        this.errorLabel = true;
        this.countDown = 5;
        this.countDownTimer();
      }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.successLabel = false;
        this.errorLabel = false;
      }
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