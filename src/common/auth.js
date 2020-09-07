import { berest } from "./berest";

var _vm = null;

const AUTH_USER = "auth_user";

export default {
  user() {
    if (localStorage.getItem(AUTH_USER)) {
      return JSON.parse(localStorage.getItem(AUTH_USER));
    } else return false;
  },
  isAuthenticated() {
    var isAuthenticated = false;
    if (this.user()) {
      const sessionTime = 3600000; //1h
      const mstime = new Date().getTime() - this.user().dtlogin;
      if (mstime <= sessionTime) isAuthenticated = true;
    }

    return isAuthenticated;
  },
  askForAuthentication() {
    try {
      if (_vm.$route.matched.length <= 0) return false;
      else if (_vm.$route.meta && typeof _vm.$route.meta.auth === "boolean")
        return _vm.$route.meta.auth;
    } catch (error) {
      // console.log(error)
    }

    return true;
  },
  checkAuthentication() {
    if (this.askForAuthentication() && !this.isAuthenticated()) {
      _vm.$util.link("login");
      _vm.$store.commit("showmsg", {
        text: "Faça login para acessar",
        type: "accent",
      });
    }
  },
  login(auth, config) {
    return berest("/login", auth)
      .then((data) => {
        if (data.id) {
          var user = {
            name: data.name,
            login: data.login,
          };

          return _login(user, config);
        } else {
          _vm.$store.commit("showmsg", {
            text: "Acesso invalido",
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        _vm.$store.commit("showmsg", {
          text: "Nao foi possivel fazer login",
          type: "error",
        });

        _logout();
      });
  },
  logout() {
    _logout();
  },
  externalLogin(user, config) {
    return _login(user, config);
  },
  updateUserInfos(infos) {
    const p = new Promise((resolve) => {
      var user = this.user();
      Object.assign(user.infos, infos);
      _populateUser(user);
      resolve(_vm.$auth.user());
    });

    return p;
  },
  AUTH_USER,
  install(Vue, config) {
    _vm = config.vm;

    Vue.prototype.$auth = this;
  },
};

const _login = (user, config) => {
  var model = {
    name: null,
    login: null,
    avatar: null,
    dtlogin: new Date().getTime(),
    infos: {},
  };
  //CALL BACKEND FOR MORE INFOS
  return _afeterLogin(Object.assign(model, user), config);
};

const _afeterLogin = (user, config) => {
  _populateUser(user);

  var redirectTo = "home";
  if (config && config.redirectTo != undefined) redirectTo = config.redirectTo;

  if (redirectTo) {
    _vm.$util.link(redirectTo);
    _vm.$store.commit("refreshReloadableKey");
  }

  return user;
};

const _populateUser = (user) => {
  localStorage.setItem(AUTH_USER, JSON.stringify(user));
};

const _logout = () => {
  //   console.log("_logout");
  localStorage.removeItem(AUTH_USER);
  _vm.$util.link("login");
  _vm.$store.commit("refreshReloadableKey");
};
