<template>
  <div class="pa-3">
    <Default>
      <v-card v-if="is_login" color="dark" class="fill-height">
        <v-card-title class="text-center justify-center py-6">
          <h2 class="font-weight-bold display-3">{{ username }}, 欢迎您!</h2>
        </v-card-title>
        <v-card-subtitle class="text-center justify-center py-6">
          <p>我的地址：{{ address }}</p>
        </v-card-subtitle>

        <v-tabs v-model="tab" background-color="transparent" color="dark" grow>
          <v-tab v-for="(item, idx) in items" :key="(item, idx)">
            <a
              :class="{
                                'nav-link': true,
                                active: idx === activeIndex,
                            }"
              @click="changeIdx(idx)"
            >{{ item }}</a>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card color="dark" flat>
              <v-card-text>
                <div v-for="(content, idx) in contents" :key="(content, idx)">
                  <div v-show="idx === activeIndex">{{ content }}</div>
                </div>
              </v-card-text>
              <v-card-text>{{ newline }}</v-card-text>

              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-row v-else align="center" justify="center">
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
                  name="User Name"
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
                <v-text-field
                  label="User Name"
                  name="User Name"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>
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
    </Default>
  </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  components: {
    Default,
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized"]),
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
  },
  data() {
    return {
      is_login: false, //是否登录
      show_login: true, //是否显示登陆页面，否则显示注册页面
      tab: null,
      items: ["我的任务", "我的贡献", "我的奖励", "我的余额"],
      contents: [
        "here is my task",
        "here is my contribution",
        "here is my reward",
        "here is my left money",
      ],
      newline: "\n",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      username: "",
      address: "",
      name_address: [
        {
          id: 0,
          username: "yifan",
          address: "0x9e110682053b8d11433147ec54e236de6d58",
        },
        {
          id: 1,
          username: "yani",
          address: "0x15a58ee4f45f6e3eedc53402106c43fac72b",
        },
        {
          id: 2,
          username: "yunda",
          address: "0xc746eaf03fd4ee08366f6dd529cba85470cc",
        },
        {
          id: 3,
          username: "jiongnan",
          address: "0xcf9102d55cd4742381e7022b35308418803e",
        },
        {
          id: 4,
          username: "hang",
          address: "0xbf3b759166d1dd1d0104adae2573afbfe2a6",
        },
        {
          id: 5,
          username: "tang",
          address: "0xfb44acd9a98c334c24e14eb132dc7271c7bc",
        },
        {
          id: 6,
          username: "yu",
          address: "0x77e65d3405865c5d0aaf91bd5043cad508df",
        },
        {
          id: 7,
          username: "zhao",
          address: "0x523511c3832934f27acaa87fc5ecc570035f",
        },
        {
          id: 8,
          username: "pao",
          address: "0xa62a5afcd566165f0a899e253200d4162fd1",
        },
        {
          id: 9,
          username: "admin",
          address: "0xfb96b773edd31d129c044e9947cbf16d49c0",
        },
      ],
    };
  },
  methods: {
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
          msg: "登陆失败",
        });
      } else {
        this.address = address;
        this.is_login = true;
        this.$message({
          type: "success",
          msg: "登陆成功",
        });
      }
    },
    changeIdx: function (idx) {
      this.activeIndex = idx;
    },
  },
};
</script>
