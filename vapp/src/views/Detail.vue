<template>
  <div>
    <Default>
      <v-card v-if="is_login" class="fill-height" color="red lighten-2" width="7000" shaped>
        <v-row>
          <v-col>
            <v-card flat class="mx-auto" max-width="344" shaped>
              <v-img src="../assets/logo.png" height="200px"></v-img>

              <v-card-title>{{task.title}}</v-card-title>

              <v-card-subtitle>{{task.summary}}</v-card-subtitle>
            </v-card>
          </v-col>

          <v-col class="pr-12">
            <v-card flat width="600" height="305" shaped>
              <v-card-title>时间线</v-card-title>
              <v-card-text>
                <v-list light rounded>
                  <v-list-item-group v-model="item" color="red lighten-2">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-alarm-check</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-row>
                          <v-col md="2">任务开始</v-col>
                          <v-col>2020-07-23 10:20</v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon v-text="icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-row>
                          <v-col md="2">任务截止</v-col>
                          <v-col>{{task.deadline}}</v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon v-text="icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-row>
                          <v-col md="2">奖励发放</v-col>
                          <v-col>{{task.deadline}}</v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card flat class="fill-height">
          <v-tabs color="red lighten-2" left>
            <v-tab>任务详情</v-tab>
            <v-tab>其他信息</v-tab>

            <v-tab-item>
              <v-spacer></v-spacer>
              <p class="text-left pa-3">{{task.content}}</p>
            </v-tab-item>
            <v-tab-item>
              <v-spacer></v-spacer>
              <h3 class="text-left pa-3">发布者：{{task.creator}}</h3>
            </v-tab-item>
          </v-tabs>
        </v-card>
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
  name: "Detail",
  components: {
    Default,
    Login,
  },
  data() {
    return {
      icon: "mdi-alarm",
      id: this.$route.params.id,
      task: {},
      rating: 3,
      item: null,
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
  async mounted() {
    const res = await this.$axios.get(`/api/task/detail/${this.id}`);
    //console.log(res);
    this.task = res.data.payload.task;
  },
  methods: {},
};
</script>
