<template>
  <div class="pa-3">
    <Default>
      <v-card v-if="is_login" class="fill-height" shaped>
        <v-card-title class="text-center justify-center py-6">
          <h2 class="font-weight-bold display-3">{{ username }}, 欢迎您!</h2>
        </v-card-title>

        <v-tabs v-model="tab" background-color="transparent" color="dark" grow>
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card width="7000" flat shaped>
              <MyContribution />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card width="7000" flat shaped>
              <MyReward />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card width="7000" flat shaped>
              <MyBalance />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <Login v-else></Login>
    </Default>
  </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
import { mapGetters } from "vuex";
import MyContribution from "../components/MyContribution";
import MyReward from "../components/MyReward";
import MyBalance from "../components/MyBalance";
import Login from "../components/Login";

export default {
  name: "Profile",
  components: {
    Default,
    MyContribution,
    MyReward,
    MyBalance,
    Login,
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized"]),
    ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
  },
  data() {
    return {
      is_login: false, //是否登录
      tab: null,
      items: ["我的贡献", "我的奖励", "账户信息"],
      newline: "\n",
      username: "yifan",
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
    changeIdx: function (idx) {
      this.activeIndex = idx;
    },
  },
};
</script>
