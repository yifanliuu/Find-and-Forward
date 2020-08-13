<template>
  <div class="invite">
    <Admin>
      <Friends v-if="is_login"></Friends>
      <Login v-else></Login>
    </Admin>
  </div>
</template>

<script>
import Admin from "../../layout/admin";
import Friends from "../../components/Friends";
import Login from "../../components/Login";
import { mapState } from "vuex";

export default {
  name: "AdminInvite",
  components: {
    Admin,
    Friends,
    Login,
  },

  data() {
    return {
      input: "",
    };
  },
  computed: {
    ...mapState(["username", "user_id", "address", "balance", "is_login"]),
  },
};
</script>
