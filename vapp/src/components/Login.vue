<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card v-if="show_login" class="elevation-12">
        <v-toolbar color="red darken-4" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>Give us your user name to check your address.</v-card-text>
        <v-card-text>
          <v-form>
            <v-text-field
              label="User Name"
              name="username"
              prepend-icon="mdi-account"
              type="text"
              v-model="user_name"
            ></v-text-field>
            <v-text-field
              label="Password"
              name="Password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="change_show_login()">No Account? Sign up</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="login()" color="red darken-4" dark>Login</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else class="elevation-12">
        <v-toolbar light flat>
          <v-toolbar-title>Sign Up</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>Give us your user name to sign up.</v-card-text>
        <v-card-text>
          <v-form>
            <v-text-field label="User Name" name="User Name" prepend-icon="mdi-account" type="text"></v-text-field>
            <v-text-field label="Password" name="Password" prepend-icon="mdi-account" type="text"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="change_show_login()">Have Account? Login</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="signup()" light>Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      icon: "mdi-flag",
      item: 1,
      show_login: true, //是否显示登陆页面，否则显示注册页面
      user_name: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
  methods: {
    change_show_login() {
      this.show_login = !this.show_login;
    },
    signup() {},
    async login() {
      const res = await this.$axios.get("/api/user/info", {
        params: {
          username: this.user_name,
          password: this.password,
        },
      });
      //console.log(res.data.payload);
      if (res.data == 404) {
        this.$message({
          type: "error",
          message: "登陆失败",
        });
      } else {
        const user_id = res.data.payload.user_id;
        const username = res.data.payload.username;
        const address = res.data.payload.address;
        this.user_name = username;
        const balance = res.data.payload.balance;
        this.$message({
          type: "success",
          message: "登陆成功",
        });
        this.$store.dispatch("setUsername", username);
        this.$store.dispatch("setUserId", user_id);
        this.$store.dispatch("setAddress", address);
        this.$store.dispatch("setBalance", balance);
        this.$store.dispatch("setIsLogin", true);
        if (user_id == 9) {
          this.$router.push("/admin/tasks");
        } else {
          this.$router.push("/tasks");
        }
      }
    },
  },
};
</script>
