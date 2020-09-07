<template>
  <v-container id="containerLogin" fill-height fluid>
    <v-row
      no-gutters
      justify="center"
      align="center"
      align-content="center"
    >
      <v-col :style="{ 'max-width': '250px' }">
        <v-row
          no-gutters
          justify="center"
          align="center"
          align-content="center"
        >
          <v-col cols="12" class="text-center pa-0">
            <img src="/img/icons/logo.png" :width="imgSize" />
          </v-col>
          <v-col cols="12">
            <v-form
              id="formlogin"
              ref="formlogin"
              @submit.prevent="login"
              autocomplete="on"
              :lazy-validation="true"
            >
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    autocomplete
                    clearable
                    clear-icon="fas fa-times grey--text"
                    prepend-inner-icon="fas fa-user grey--text"
                    name="login"
                    id="login"
                    placeholder="Login"
                    type="text"
                    v-model="auth.login"
                    :rules="loginrules"
                    :validate-on-blur="false"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    clearable
                    clear-icon="fas fa-times grey--text"
                    prepend-inner-icon="fas fa-lock grey--text"
                    name="password"
                    id="password"
                    placeholder="Senha"
                    :type="showpassword ? 'text' : 'password'"
                    :append-outer-icon="
                      !showpassword
                        ? 'far fa-eye-slash grey--text'
                        : 'far fa-eye grey--text'
                    "
                    @click:append-outer="showpassword = !showpassword"
                    v-model="auth.password"
                    :rules="loginrules"
                    :validate-on-blur="false"
                  />
                </v-col>
                <v-col cols="12">
                  <v-btn
                    outlined
                    block
                    color="primary"
                    type="submit"
                    form="formlogin"
                    :loading="btnLoginLoading"
                    :disabled="btnLoginLoading"
                  >
                    <v-icon right>fas fa-sign-in-alt</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <facebookBtnLogin />
                </v-col>
                 <v-col cols="12">
                  <googleBtnLogin />
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import facebookBtnLogin from "./../components/facebookBtnLogin";
import googleBtnLogin from "./../components/googleBtnLogin";

export default {
  data() {
    return {
      imgSize: 180,
      btnLoginLoading: false,
      loginrules: [],
      showpassword: false,
      auth: {
        login: "mock.user",
        password: "mock.pass",
      },
    };
  },
  methods: {
    login: function () {
      this.loginrules.push(this.$util.formrules.required);

      if (!this.$refs.formlogin.validate()) {
        setTimeout(() => {
          this.loginrules.splice(0, this.loginrules.length);
          if (this.$refs.formlogin) this.$refs.formlogin.resetValidation();
        }, 3000);
        return;
      }

      this.btnLoginLoading = true;
      this.$auth.login(Object.assign({}, this.auth)).finally(() => {
        this.btnLoginLoading = false;
      });
    },
  },
  components: {
    facebookBtnLogin,
    googleBtnLogin,
  },
};
</script>
