<template>
  <div class="home">
    <Default>
      <v-card class="fill-height" width="7000" shaped>
        <v-list rounded>
          <v-subheader>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-row>
              <v-col md="2">邀请人</v-col>
              <v-col>任务</v-col>
              <v-col md="3">邀请状态</v-col>
            </v-row>
          </v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="item in messages" :key="item.id">
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-row>
                  <v-col md="2">{{item.invitor}}</v-col>
                  <v-col>{{item.task_title}}</v-col>
                  <v-col md="3" v-if="item.status === 0">
                    <v-row dense>
                      <v-col>
                        <v-btn>接受</v-btn>
                      </v-col>
                      <v-col>
                        <v-btn>拒绝</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col v-if="item.status === 1">已接受</v-col>
                  <v-col v-if="item.status === 2">已拒绝</v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </Default>
  </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";
export default {
  name: "Message",
  components: {
    Default,
  },

  data() {
    return {
      // status: 0未处理，1已接受，2已拒绝
      messages: [
        {
          id: 1,
          invitor: "雅妮",
          task_id: 2,
          task_title: "数据标注任务",
          status: 0,
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
