<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <div class="center-text">
                <div class="box">
                  <ul>
                    <li>
                      <span ><a class="button is-info is-large">整箱</a></span>
                      <span ><a class="button is-primary is-large">拼箱</a></span>
                    </li>
                  </ul>
                </div>

            <form>

              <div class="field">
                <p class="control is-fullwidth is-large has-addons-right">

                  <b-autocomplete
                    :size="'is-large'"
                    :expanded="true"
                    placeholder="起始港"
                    :open-on-focus="true"
                    >
                  </b-autocomplete>
                  <!--<b-autocomplete
                    :value="portName(current.routeLinePortLoadId)"
                    @input="value => input = value"
                    placeholder="起始港"
                    :data="filteredDataObj"
                    field="nameCn"
                    :open-on-focus="true"
                    @select="option => current.routeLinePortLoadId = option ? option.portId : ''">
                  </b-autocomplete>-->
                </p>

              </div>

              <div class="field">
                <p class="control is-fullwidth is-large has-addons-right">

                  <b-autocomplete
                    :size="'is-large'"
                    :expanded="true"
                    placeholder="目的港"
                    :open-on-focus="true"
                  >
                  </b-autocomplete>
                  <!--<b-autocomplete
                    :value="portName(current.routeLinePortLoadId)"
                    @input="value => input = value"
                    placeholder="起始港"
                    :data="filteredDataObj"
                    field="nameCn"
                    :open-on-focus="true"
                    @select="option => current.routeLinePortLoadId = option ? option.portId : ''">
                  </b-autocomplete>-->
                </p>
              </div>

              <a class="button is-primary is-large is-fullwidth" href="./index.html" target="_blank">
                <span class="icon is-medium">
                  <i class="far fa-bell"></i>
                </span>
                <span>搜索</span>
              </a>
              <br>
            </form>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/variables';
@import '~hover.css/scss/hover.scss';
$primary: #772b90;

.home-brief {
  color: $primary;

  a.button {
    color: $primary;

    &:hover,
    &:hover span {
      color: $primary;
    }
  }

  .hvr-buzz {
    display: flex;
  }
}

div.is-parent {
  margin: auto;
  max-width: 90rem;
}

.vuejs {
  color: #4fc08d;
}

.bulma {
  color: #00d1b2;
}

</style>
