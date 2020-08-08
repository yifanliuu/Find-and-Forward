<template>
  <v-card class="mx-auto" shaped>
    <v-list rounded>
      <v-subheader>
        <v-list-item-icon>
          <v-icon></v-icon>
        </v-list-item-icon>
        <v-row>
          <v-col>任务</v-col>
          <v-col>截止日期</v-col>
          <v-col>工作贡献</v-col>
          <v-col>邀请贡献</v-col>
          <v-col>总贡献</v-col>
        </v-row>
      </v-subheader>
      <v-list-item-group v-model="item" color="red lighten-2">
        <v-list-item v-for="item in contributions" :key="item.task_id">
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-row>
              <v-col>{{ item.task_title }}</v-col>
              <v-col>{{ item.deadline }}</v-col>
              <v-col>{{ item.work_contrib }}</v-col>
              <v-col>{{ item.invite_contrib }}</v-col>
              <v-col>{{ item.total_contrib }}</v-col>
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
  name: "MyContribution",
  data() {
    return {
      icon: "mdi-flag",
      item: 1,
      contributions: [],
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
  async mounted() {
    const res = await this.$axios.get("/api/contrib", {
      params: {
        user_id: this.user_id,
      },
    });
    console.log(res.data.payload);

    this.contributions = res.data.payload.list;
  },
  methods: {},
};
</script>
