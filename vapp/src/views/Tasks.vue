<template>
  <div>
    <Default>
      <v-card v-if="is_login" class="fill-height" color="red lighten-2" width="7000" shaped dark>
        <v-card-title class="headline red lighten-3">查看我的任务</v-card-title>
        <v-tabs left dark background-color="transparent">
          <v-tab>我参与的任务</v-tab>
          <v-tab>我发布的任务</v-tab>

          <v-tab-item>
            <v-card class="fill-height" color="red lighten-2" width="7000">
              <v-row class="pl-3 pr-3">
                <v-col md="4" v-for="item in tasks" :key="item.id">
                  <v-card class="mx-auto" max-width="344" light shaped>
                    <v-img src="../assets/logo.png" height="200px"></v-img>

                    <v-card-title>{{ item.title }}</v-card-title>

                    <v-card-subtitle>{{ item.summary }}</v-card-subtitle>

                    <v-card-actions>
                      <v-btn text to="/invite">分享</v-btn>

                      <v-btn color="red lighten-3" :to="`/tasks/${item.id}` " dark>详情</v-btn>

                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="fill-height" color="red lighten-2" width="7000">
              <v-row class="pl-3 pr-3">
                <v-col md="4" v-for="item in create_tasks" :key="item.id">
                  <v-card class="mx-auto" max-width="344" light shaped>
                    <v-img src="../assets/logo.png" height="200px"></v-img>

                    <v-card-title>{{ item.title }}</v-card-title>

                    <v-card-subtitle>{{ item.summary }}</v-card-subtitle>

                    <v-card-actions>
                      <v-btn text to="/invite">分享</v-btn>

                      <v-btn color="red lighten-3" :to="`/tasks/${item.id}` " dark>详情</v-btn>

                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>

      <Login v-else></Login>
    </Default>
  </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
  name: "Tasks",
  components: {
    Default,
    Login,
  },
  data() {
    return {
      tasks: [],
      create_tasks: [],
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
  async mounted() {
    const res = await this.$axios.get("/api/task", {
      params: {
        user_id: this.user_id,
      },
    });
    //console.log(res.data.payload);
    this.tasks = res.data.payload;

    const res1 = await this.$axios.get("/api/task/create", {
      params: {
        creator: this.user_id,
      },
    });
    //console.log(res1.data.payload);
    this.create_tasks = res1.data.payload;
  },
};
</script>
