<template>
  <v-btn secondaryid="fbbtnlogin" color="facebook" class="white--text" block @click="login()">
    <v-icon left>fab fa-facebook-square</v-icon>Facebook
  </v-btn>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    checkExists: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    show: {
      get: function() {
        return this.dialog;
      },
      set: function(value) {
        this.$emit("update:dialog", value);
      }
    }
  },
  data() {
    return {};
  },
  beforeMount() {
    this.initialize();
  },
  methods: {
    ...mapMutations(["showmsg", "toogleDialogLoading"]),
    initialize() {
      //eslint-disable-next-line
      FB.init({
        appId: "000", //
        autoLogAppEvents: true,
        xfbml: true,
        version: "v4.0"
      });
    },
    login() {
      var thiz = this;
      //eslint-disable-next-line
      FB.login(function(response) {
        if (!(typeof this.facebookOnSuccess == "function"))
          window.facebookOnSuccess = thiz.facebookOnSuccess;

        thiz.facebookOnSuccess(response);
      });
    },
    facebookOnSuccess(response) {
      //console.log(response);
      var thiz = this;
      if (response.status === "connected") {
        this.toogleDialogLoading(true);
        // eslint-disable-next-line
        FB.api("/me", { fields: "name,email,picture" }, function(fbdata) {
          //console.log(fbdata);
          var user = {
            nome: fbdata.name,
            login: fbdata.email ? fbdata.email : fbdata.id + "@facebook.com",
            avatar: fbdata.picture.data.url
          };

          thiz.$auth.externalLogin(user);
        });
      } else {
        this.showmsg({ text: "Acesso nao autorizado", type: "error" });
      }
    }
  }
};
</script>
