<template>
  <v-card class="mx-auto" shaped>
    <v-list rounded>
      <v-list-item-group v-model="item" color="red lighten-2">
        <v-list-item>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-row>
              <v-col md="2">我的地址</v-col>
              <v-col>{{ address }}</v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-row>
              <v-col md="2">我的余额</v-col>
              <v-col>{{ balance }}</v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyBalance",
  data() {
    return {
      icon: "mdi-flag",
      item: 1,
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },

  methods: {},
};
</script>
