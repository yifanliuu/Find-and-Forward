<template>
  <div class="pa-3">
    <Default>
      <v-card v-if="is_login" class="fill-height" color="red lighten-2" dark shaped>
        <v-card-title class="text-center justify-center py-6 headline red lighten-3">
          <h2 class="font-weight-bold display-3">{{ username }}, 欢迎您!</h2>
        </v-card-title>
        <v-spacer></v-spacer>

        <v-tabs v-model="tab" background-color="transparent" color="dark" grow>
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" background-color="transparent" color="dark">
          <v-tab-item>
            <v-card width="7000" color="dark" shaped>
              <MyContribution />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card width="7000" color="dark" shaped>
              <MyReward />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card width="7000" color="dark" shaped>
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
import { mapGetters, mapState } from "vuex";
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
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
  data() {
    return {
      tab: null,
      items: ["我的贡献", "我的奖励", "账户信息"],
      newline: "\n",
    };
  },
  methods: {},
};
</script>
