<template>
  <div class="pa-3">
    <v-card class="mx-auto" shaped>
      <v-list rounded>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-row>
                <v-col md="2">我的地址</v-col>
                <v-col>{{address}}</v-col>
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
                <v-col>{{balance}}</v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MyBalance",
  data() {
    return {
      icon: "mdi-flag",
      item: 1,
      balance: 6,
      address: "0x6546878097e646ca76600909007",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
