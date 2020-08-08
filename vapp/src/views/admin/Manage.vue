<template>
  <div class="manage">
    <Admin>
      <v-card v-if="is_login" class="fill-height" width="7000" shaped>
        <v-card color="red lighten-2" dark>
          <v-card-title class="headline red lighten-3">搜索任务以获得管理信息</v-card-title>
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
            <v-list v-if="model" class="red lighten-3" rounded>
              <v-subheader>
                <v-list-item-icon>
                  <v-icon></v-icon>
                </v-list-item-icon>
                <v-row>
                  <v-col>参与用户</v-col>
                  <v-col>工作贡献</v-col>
                  <v-col>邀请贡献</v-col>
                </v-row>
              </v-subheader>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="item in manages" :key="item.user_id">
                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-row>
                      <v-col>{{item.username}}</v-col>
                      <v-col>{{item.work_contrib}}</v-col>
                      <v-col>{{item.invite_contrib}}</v-col>
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
      <Login v-else></Login>
    </Admin>
  </div>
</template>

<script>
import Admin from "../../layout/admin";
import Login from "../../components/Login";
import { mapState } from "vuex";

export default {
  name: "AdminManage",
  components: {
    Admin,
    Login,
  },

  data() {
    return {
      item: null,
      manages: [],
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
    this.tasks = res_task.data.payload.task_list;
    this.initiallized = true;
  },

  watch: {
    async search() {
      // Items have already been loaded
      if (this.manages.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;
      this.isLoading = true;

      const task_id = this.model.id;
      //console.log(task_id);
      const res = await this.$axios.get("/api/task/admin/contrib", {
        params: {
          task_id: task_id,
        },
      });
      //console.log(res.data.payload);
      this.manages = res.data.payload;
    },
  },
  methods: {},
};
</script>
