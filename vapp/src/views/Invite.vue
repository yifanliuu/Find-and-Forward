<template>
  <div class="invite">
    <Default>
      <Friends v-if="is_login"></Friends>
      <Login v-else></Login>
    </Default>
  </div>
</template>

<script>
import Default from "../layout/default";
import Friends from "../components/Friends";
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
  name: "Invite",
  components: {
    Default,
    Friends,
    Login,
  },

  data() {
    return {};
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
  methods: {},
};
</script>
