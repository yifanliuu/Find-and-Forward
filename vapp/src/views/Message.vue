<template>
  <div class="home">
    <Default>
      <v-tab v-for="(item,idx) in messages" :key="(item,idx)">
        <el-button type="text" @click="open(idx)">{{item}}</el-button>
      </v-tab>
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
      activeName: "second",
      messages: ["message1", "message2", "message3"],
      message_titles: ["title1", "title2", "title3"],
      message_contents: [
        "here is message 1",
        "here is message 2",
        "here is message 3",
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    open(index) {
      this.$alert(this.message_contents[index], this.message_titles[index], {
        confirmButtonText: "确定",
        /*callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }*/
      });
    },
  },
};
</script>
