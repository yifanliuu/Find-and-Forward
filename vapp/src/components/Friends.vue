<template>
  <v-card v-if="is_login" class="fill-height" width="7000" color="red lighten-2" shaped>
    <v-card color="red lighten-2" dark>
      <v-card-title class="headline red lighten-3">搜索任务以邀请好友</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="tasks"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          item-text="title"
          item-value="id"
          label="Tasks"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model" light rounded>
          <v-subheader>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-row>
              <v-col>好友</v-col>
              <v-col>邀请状态</v-col>
            </v-row>
          </v-subheader>
          <v-list-item-group v-model="item" color="red lighten-2">
            <v-list-item v-for="item in friends" :key="item.id">
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-row>
                  <v-col>{{item.name}}</v-col>
                  <v-col v-if="item.status === 1">
                    <v-chip color="primary" @click="invite(item.id)" small>
                      <v-icon left>mdi-plus</v-icon>邀请
                    </v-chip>
                  </v-col>
                  <v-col v-else>
                    <v-chip small>
                      <v-icon left>mdi-close</v-icon>不可邀请
                    </v-chip>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
          Clear
          <v-icon right>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Friends",
  data() {
    return {
      icon: "mdi-account",
      item: null,
      friends: [],
      descriptionLimit: 60,
      tasks: [],
      isLoading: false,
      model: null,
      search: null,
      initiallized: false,
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },

  async mounted() {
    const res_task = await this.$axios.get("/api/task", {
      params: {
        user_id: this.user_id,
      },
    });
    //console.log(res.data.payload);
    this.tasks = res_task.data.payload;
    this.initiallized = true;
  },

  watch: {
    async search() {
      // Items have already been loaded
      if (this.friends.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;
      this.isLoading = true;

      const task_id = this.model.id;
      //console.log(task_id);
      const res = await this.$axios.get("/api/friends", {
        params: {
          task_id: task_id,
          user_id: this.user_id,
        },
      });
      //console.log(res.data.payload);
      this.friends = res.data.payload;
    },
  },
  methods: {
    async update() {
      const task_id = this.model.id;
      //console.log(task_id);
      const res = await this.$axios.get("/api/friends", {
        params: {
          task_id: task_id,
          user_id: this.user_id,
        },
      });
      //console.log(res.data.payload);
      this.friends = res.data.payload;
    },
    invite(id) {
      console.log(id);
      this.$confirm("此操作将发送邀请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const res = this.$axios.post("/api/invite", {
            user_id: this.user_id,
            friend_id: id,
            task_id: this.model.id,
          });
          console.log(res.data);
          if (res.status == 404) {
            this.$message({
              type: "error",
              message: "发送失败!",
            });
          } else {
            this.$message({
              type: "success",
              message: "发送邀请成功!",
            });
            this.update();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消邀请",
          });
        });
    },
  },
};
</script>