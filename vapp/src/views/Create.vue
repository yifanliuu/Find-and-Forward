<template>
  <div class="home">
    <Default>
      <v-card v-if="is_login" class="fill-height" width="7000" color="red lighten-2" dark shaped>
        <v-card-title class="headline red lighten-3">创建任务</v-card-title>
        <v-card light class="pr-10 pl-10">
          <v-row>
            <v-col>
              <v-text-field
                prepend-icon="mdi-flag"
                label="任务标题"
                v-model="task.title"
                color="red lighten-2"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-text"
                label="任务简介"
                v-model="task.summary"
                color="red lighten-2"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="选择任务截止时间"
                    prepend-icon="mdi-clock"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="red lighten-2"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
                  :first-day-of-week="0"
                  locale="zh-cn"
                  color="red lighten-2"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="red lighten-2" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="red lighten-2" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-text-field
                prepend-icon="mdi-text"
                label="子任务数目"
                v-model="task.subtask_num"
                color="red lighten-2"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                outlined
                prepend-icon="mdi-text"
                name="input-7-4"
                label="任务详情"
                v-model="task.content"
                color="red lighten-2"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-file-input
                accept="image/*"
                label="上传任务图片"
                filled
                prepend-icon="mdi-camera"
                color="red lighten-2"
              ></v-file-input>
            </v-col>
            <v-col>
              <v-file-input label="上传任务文件" filled prepend-icon="mdi-file" color="red lighten-2"></v-file-input>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-2" @click="create_task()" dark>
              提交
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
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
  name: "Create",
  components: {
    Default,
    Login,
  },
  data() {
    return {
      // status: 0未处理，1已接受，2已拒绝
      item: null,
      icon: "mdi-flag",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      task: {
        title: "",
        photo_path: "",
        summary: "",
        content: "",
        subtask_num: null,
        creator: this.user_id,
        deadline: "",
      },
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
  async mounted() {},
  methods: {
    async create_task() {
      this.task.deadline = this.date;
      console.log(this.task);
    },
  },
};
</script>
