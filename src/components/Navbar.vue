<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: showHead, slideOutDown: !showHead }">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left is-flex">
          <router-link class="nav-item hvr-underline-from-center" to="/home">
            {{$t('header.nav[0]')}}
          </router-link>
          <a class="nav-item hvr-underline-from-center" href="/home" v-if="$db.user">
            退出
          </a>
          <router-link class="nav-item hvr-underline-from-center" to="/manual" v-else>
            {{$t('header.nav[2]')}}
          </router-link>
					<router-link class="nav-item hvr-underline-from-center" to="/about">
						{{$t('header.nav[3]')}}
					</router-link>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import langs from 'i18n/langs'

export default {
  data () {
    return {
      showLangs: false,
      langs: langs
    }
  },

  props: {
    showHead: Boolean,
    showBody: Boolean
  },

  computed: mapGetters({
    device: 'device',
    current: 'current'
  }),

  methods: {
    ...mapActions([
      'toggleLang'
    ]),
    setLang (lang) {
      this.$i18n.locale = lang
      this.toggleLang(lang)
    },
    logout(){
      this.$db.user = {}
      this.$router.push('/home.html')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/variables';
@import '~bulma/sass/utilities/mixins';
@import '~hover.css/scss/hover.scss';
$primary: white;
$main_color : #2b4079;

.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  background-color: $main_color;

  .nav {
    margin: 0 auto;
    max-width: 90rem;
    height: 4rem;
    color:white;

    .nav-item a, a.nav-item {
      color: white;
    }

    @include mobile() {
      height: 2rem;
    }
  }

  .nav-right {
    text-transform: Capitalize;
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
}

.hero-brand {
  .tour-logo {
    max-height: 3rem;
  }

  .tour-title {
    font-size: 1.75rem;

    .vue {
      margin-left: 10px;
    }

    .bulma {
      margin-left: 5px;
    }
  }
}

.tour-drop-down {
  cursor: pointer;

  .tour-drop-down-list {
    box-sizing: border-box;
    position: absolute;
    top: 80%;
    right: 0.75rem;
    max-width: 7rem;
    background-color: $main_color;
    padding: 0.75rem 0;
    border: 1px solid #ddd;
    border-bottom-color: #ccc;
    text-align: left;
    border-radius: 4px;
    white-space: nowrap;

    li {
      line-height: 1.8em;
      padding: 0.25rem 1.5rem;
      margin: 0;
      display: block;

      a:hover {
        color: $primary;
      }
    }
  }
}

.hvr-underline-from-center {
  display: flex;

  &:before {
    background: $primary;
  }
}

</style>
