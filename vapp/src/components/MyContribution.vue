<template>
  <div class="pa-3">
    <v-card class="mx-auto" shaped>
      <v-list rounded>
        <v-subheader>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-row>
            <v-col md="2">任务</v-col>
            <v-col>工作贡献</v-col>
            <v-col>邀请贡献</v-col>
            <v-col>总贡献</v-col>
          </v-row>
        </v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="item in contributions" :key="item.task_id">
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-row>
                <v-col md="2">{{item.task_title}}</v-col>
                <v-col>{{item.work_contrib}}</v-col>
                <v-col>{{item.invite_contrib}}</v-col>
                <v-col>{{item.total_contib}}</v-col>
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
  name: "MyContribution",
  data() {
    return {
      icon: "mdi-flag",
      item: 1,
      contributions: [
        {
          task_id: 1,
          task_title: "task1",
          work_contrib: 7,
          invite_contrib: 9,
          total_contib: 16,
        },
        {
          task_id: 2,
          task_title: "task2",
          work_contrib: 6,
          invite_contrib: 9,
          total_contib: 15,
        },
        {
          task_id: 3,
          task_title: "task3",
          work_contrib: 1,
          invite_contrib: 2,
          total_contib: 3,
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
