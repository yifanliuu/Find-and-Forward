<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card v-if="show_login" class="elevation-12">
        <v-toolbar color="primary" dark flat>
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
              v-model="username"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="change_show_login()">No Account? Sign up</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="login()" color="primary">Login</v-btn>
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
export default {
  name: "Login",
  data() {
    return {
      icon: "mdi-flag",
      item: 1,
      show_login: true, //是否显示登陆页面，否则显示注册页面
      is_login: false, //是否登录
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    change_show_login() {
      this.show_login = !this.show_login;
    },
    get_address(username) {
      const na = this.name_address.find((item) => item.username == username);
      console.log(na);
      if (na == undefined) {
        return -1;
      }
      return na.address;
    },
    signup() {},
    login() {
      const address = this.get_address(this.username);
      if (address == -1) {
        this.$message({
          type: "error",
          message: "登陆失败",
        });
      } else {
        this.address = address;
        this.is_login = true;
        this.$message({
          type: "success",
          message: "登陆成功",
        });
      }
    },
  },
};
</script>
