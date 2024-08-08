<template>
  <v-app>
    <div id="mainDiv">
      <div id="loginMain">
        <v-img src="../assets/images/logo.png" id="logoImage"></v-img>
        <p id="authTitle">Авторизация</p>
        <div id="column">
          <p id="inputTitle">Логин</p>
          <input id="loginInput" v-model="login" />
          <p id="inputTitle">Пароль</p>
          <input id="passwordInput" v-model="password" type="password" />
          <button
            id="submitBtn"
            type="button"
            class="btn btn-success"
            v-on:click="loginAction"
          >
            ВОЙТИ
          </button>
        </div>
        <div id="alertLogin">
          <v-alert v-if="errorLabel" dismissible type="error">
            {{ errorMessage }}
          </v-alert>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import colors from "vuetify/lib/util/colors";

export default {
  name: "LoginView",
  data() {
    return {
      redColor: colors.red.darken1,
      greyColor: colors.grey.lighten4,
      url: "https://boszhan.kz",
      login: "",
      password: "",
      errorLabel: false,
      countDown: 5,
    };
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.errorLabel = false;
      }
    },

    loginAction() {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      const body = { login: this.login, password: this.password };
      this.axios
        .post(this.url + "/api/login", body, config)
        .then((response) => {
          // console.log("Полный ответ:", JSON.stringify(response.data, null, 2));
          
          if (response.data && response.data.user && response.data.user.name) {
            localStorage.username = response.data.user.name;
          } else {
            console.warn("Предупреждение: Поле 'name' отсутствует в ответе");
            localStorage.username = "Неизвестный пользователь";
          }
          
          if (response.data && response.data.access_token) {
            localStorage.token = response.data.access_token;
          } else {
            console.error("Ошибка: Поле 'access_token' отсутствует в ответе");
            throw new Error("Отсутствует токен доступа");
          }
          
          localStorage.isLogedIn = "true";
          
          if (response.data && response.data.user && response.data.user.driver && response.data.user.driver.name) {
            localStorage.driverName = response.data.user.driver.name;
          } else {
            console.warn("Предупреждение: Поле 'driver.name' отсутствует в ответе");
            localStorage.driverName = "Неизвестный водитель";
          }
          
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Ошибка входа:", error);
          
          if (error.response) {
            // console.error("Полный ответ об ошибке:", JSON.stringify(error.response.data, null, 2));
            // console.error("Статус ошибки:", error.response.status);
            // console.error("Заголовки ошибки:", error.response.headers);
            
            this.errorMessage = error.response.data.message || "Произошла ошибка при входе.";
          } else if (error.request) {
            // console.error("Запрос ошибки:", error.request);
            this.errorMessage = "Нет ответа от сервера.";
          } else {
            console.error("Сообщение об ошибке:", error.message);
            this.errorMessage = "Произошла неизвестная ошибка.";
          }
          
          this.errorLabel = true;
          this.countDown = 5;
          this.countDownTimer();
        });
    },
  },
  created() {},
  mounted() {
    if (localStorage.isLogedIn == "false") {
      this.$router.push("/auth");
    } else if (localStorage.isLogedIn == "true") {
      this.$router.push("/");
    }
  },
};
</script>
  

<style scoped>
#mainDiv {
  background-image: url("../assets/images/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

#loginMain {
  color: rgb(0, 0, 0);
  width: 400px;
  height: 650px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: v-bind(greyColor);
  /* backdrop-filter: blur(5px); */
  font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
  box-shadow: 0px 0px 20px rgba(124, 124, 124, 0.7);
}

#logoImage {
  height: 30%;
  margin-top: 20px;
}

#authTitle {
  font-size: 30px;
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
}

#submitBtn {
  display: block;
  background-color: v-bind(redColor);
  height: 50px;
  margin: 30px auto 10px auto;
  width: 80%;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 15px;
}

#inputTitle {
  width: 75%;
  text-align: left;
  margin: 10px auto 0px auto;
  font-size: 18px;
}

#loginInput {
  padding: 0 0 0 10px;
  display: block;
  width: 80%;
  height: 40px;
  margin: 10px auto 10px auto;
  background-color: white;
  border-radius: 15px;
  font-weight: bold;
  border: 1px solid;
}

#passwordInput {
  padding: 0 0 0 10px;
  display: block;
  width: 80%;
  height: 40px;
  margin: 10px auto 10px auto;
  background-color: white;
  border-radius: 15px;
  border: 1px solid;
}

input:focus {
  outline: 2px solid #546e7a;
}

#alertLogin {
  padding-top: 50px;
}
</style>