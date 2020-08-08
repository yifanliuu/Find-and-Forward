<template>
  <div class="home">
    <Default>
      <v-card v-if="is_login" class="fill-height" color="red lighten-2" width="7000" shaped>
        <v-card color="red lighten-2" dark>
          <v-card-title class="headline red lighten-3">选择任务进行工作</v-card-title>
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
                  <v-col>电影评论</v-col>
                  <v-col md="3">标注</v-col>
                </v-row>
              </v-subheader>
              <v-list-item-group v-model="item" color="red lighten-2" multiple>
                <v-list-item v-for="item in contents" :key="item.subtask_id">
                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-row>
                      <v-col>{{item.content}}</v-col>
                      <v-col md="3">
                        <v-radio-group multiple v-model="items" row>
                          <v-radio
                            label="Positive"
                            color="red lighten-2"
                            :disabled="disabled"
                            :value="`pos_${item.subtask_id}`"
                            @click="save_pos(item.subtask_id)"
                          ></v-radio>
                          <v-radio
                            label="Negative"
                            color="red lighten-2"
                            :disabled="disabled"
                            :value="`neg_${item.subtask_id}`"
                            @click="save_neg(item.subtask_id)"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expand-transition>
          <v-card-actions>
            <v-btn :disabled="!model" color="grey darken-2" @click="update()">
              Change
              <v-icon right>mdi-flag</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="!model" color="grey darken-2" @click="model = null">
              Clear
              <v-icon right>mdi-close-circle</v-icon>
            </v-btn>
            <v-btn :disabled="!model" color="grey darken-2" @click="submit()">
              Submit
              <v-icon right>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
      <Login v-else></Login>
    </Default>
  </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
import { mapState } from "vuex";
import Login from "../components/Login";

export default {
  name: "Work",
  components: {
    Default,
    Login,
  },
  data() {
    return {
      icon: "mdi-flag",
      item: null,
      contents: [],
      descriptionLimit: 60,
      tasks: [],
      isLoading: false,
      model: null,
      search: null,
      initiallized: false,
      items: null,
      disabled: false,
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
      if (this.contents.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;
      this.isLoading = true;

      //const task_id = this.model.id;
      //console.log(task_id);
      const res = await this.$axios.get("/api/task/content", {
        params: {
          subtask_num: 5,
        },
      });
      console.log(res.data.payload);
      res.data.payload.forEach((item) => {
        const a = {
          subtask_id: item.subtask_id,
          content: item.content,
          result: null,
        };
        this.contents.push(a);
      });
    },
  },
  methods: {
    async update() {
      this.contents = [];
      this.disabled = false;
      const res = await this.$axios.get("/api/task/content", {
        params: {
          subtask_num: 5,
        },
      });
      console.log(res.data.payload);
      res.data.payload.forEach((item) => {
        const a = {
          subtask_id: item.subtask_id,
          content: item.content,
          result: null,
        };
        this.contents.push(a);
      });
    },
    save_pos(id) {
      for (let index = 0; index < this.contents.length; index++) {
        if (this.contents[index].subtask_id == id) {
          this.contents[index].result = true;
        }
      }
    },
    save_neg(id) {
      for (let index = 0; index < this.contents.length; index++) {
        if (this.contents[index].subtask_id == id) {
          this.contents[index].result = false;
        }
      }
    },
    async submit() {
      //console.log(this.contents);
      this.$confirm("此操作将提交本批任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let success = true;
          for (let index = 0; index < this.contents.length; index++) {
            const item = this.contents[index];
            const res = await this.$axios.patch("/api/task/content", {
              subtask_list: [
                {
                  subtask_id: item.subtask_id,
                  task_id: this.model.id,
                  user_id: this.user_id,
                  result: item.result,
                },
              ],
            });
            if (res.status != 200) {
              success = false;
            }
            console.log(success);
          }

          if (!success) {
            this.$message({
              type: "error",
              message: "提交失败!",
            });
          } else {
            this.$message({
              type: "success",
              message: "提交成功!",
            });
            this.disabled = true;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
  },
};
</script>
