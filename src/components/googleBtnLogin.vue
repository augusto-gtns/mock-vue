<template>
  <v-btn secondaryid color="white" class block @click="login()">
    <img src="/img/others/google-icon.png" :width="22" class="logo" />
    Google
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      gauth: null
    };
  },
  methods: {
    initialize() {
      var thiz = this;
      // eslint-disable-next-line
      gapi.load("auth2", function() {
        // eslint-disable-next-line
        thiz.gauth = gapi.auth2.init({
          client_id:
            "000",
          fetch_basic_profile: true,
          scope: "profile "
        });
      });
    },
    login() {
      var thiz = this;
      // Sign the user in, and then retrieve their ID.
      this.gauth.signIn().then(function() {
        // Useful data for your client-side scripts:
        // eslint-disable-next-line
        const googleUser = thiz.gauth.currentUser.get();
        var profile = googleUser.getBasicProfile();

        // console.log("Full Name: " + profile.getName());
        // console.log("Given Name: " + profile.getGivenName());
        // console.log("Family Name: " + profile.getFamilyName());
        // console.log("Image URL: " + profile.getImageUrl());
        // console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        // var id_token = googleUser.getAuthResponse().id_token;
        // console.log("ID Token: " + id_token);

        var user = {
          nome: profile.getName(),
          login: profile.getEmail(),
          avatar: profile.getImageUrl()
        };
        // console.log(guser);

        thiz.$auth.externalLogin(user);
      });
    }
  },
  beforeMount() {
    this.initialize();
  }
};
</script>

<style scoped>
.logo {
  margin-right: 6px;
}
</style>
