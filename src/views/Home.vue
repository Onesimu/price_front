<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <div class="center-text">

            <div class="box">
              <h1 class="title is-size-1">出口运价</h1>
              <div class="level">
                <span class="level-item"><a class="button is-primary is-large">整箱</a></span>
                <span class="level-item"><a class="button is-large">拼箱</a></span>
              </div>

              <form>
                <div class="field">
                    <label class="label pull-left">from</label>
                  <p class="control is-fullwidth is-large">
                    <b-autocomplete
                      :size="'is-large'"
                      :expanded="true"
                      :value="portName(current.routeLinePortLoadId)"
                      @input="value => input1 = value"
                      placeholder="起始港"
                      :data="filteredDataObj1"
                      field="nameEn"
                      :open-on-focus="true"
                      @select="option => current.routeLinePortLoadId = option ? option.portId : ''">
                    </b-autocomplete>
                  </p>

                </div>

                <div class="field">
                  <label class="label pull-left">to</label>
                  <p class="control is-fullwidth is-large">

                    <b-autocomplete
                      :size="'is-large'"
                      :expanded="true"
                      :value="portName(current.routeLinePortDischargeId)"
                      @input="value => input2 = value"
                      placeholder="目的港"
                      :data="filteredDataObj2"
                      field="nameEn"
                      :open-on-focus="true"
                      @select="option => current.routeLinePortDischargeId = option ? option.portId : ''">
                    </b-autocomplete>
                  </p>
                </div>

                <router-link class="button is-primary is-large is-fullwidth"
                             :to="{ path:'info', query: { routeLinePortLoadId: current.routeLinePortLoadId,
                           routeLinePortDischargeId:current.routeLinePortDischargeId }}">
                <span class="icon is-medium">
                  <i class="fa fa-search"></i>
                </span>
                  <span>搜索</span>
                </router-link>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

    <figure class="image">
      <img src="../assets/banner.jpg">
    </figure>

  </section>
</template>

<script>
  import crud from "./crud"
  import {getDate} from "../utils/constants";
  import zh from '../utils/zh'
  import {mapActions, mapGetters} from 'vuex'

  export default {

    data() {
      return {
        // country:[],
        selected: {},
        input1: '',
        input2: '',
        localeOption: {
          locale: zh,
        },
      }
    },
    mixins: [crud],
    created() {
      this.entityClass = this.$spring.Seaexpressprice
      this.columns = ['routeLinePortLoadId', 'routeLinePortDischargeId', 'waiPeiCompanyId']
    },
    methods: {
      portName(item = this.current.portId) {
        const find = this.port.find(it => it.portId == item)
        return find ? find.nameEn : ''
      },
      carrierName(item = this.current.waiPeiCompanyId) {
        const find = this.carrier.find(it => it.carrierId == item)
        return find ? find.nameEn : ''
      },
      countryName(item = this.current.countryId) {
        const find = this.country.find(it => it.countryId == item)
        return find ? find.nameEn : ''
      },
      getDate: getDate,
      find() {
        const word = this.word;
        const filter = this.data.map(it => it.data()).filter(
          it => [this.portName(it.routeLinePortLoadId), this.portName(it.routeLinePortDischargeId), this.carrierName(it.carrierId)]
            .join().includes(word))
        if (filter.length == 0) {
          this.$notify.warning({
            content: '未查到结果'
          })
          return
        }
        this.viewData = filter
      },
      localSearch() {
        const search = this.current
        const predict = it =>
          search.routeLinePortLoadId === it.routeLinePortLoadId &&
          search.routeLinePortDischargeId === it.routeLinePortDischargeId
        const filter = this.data.map(it => it.data()).filter(predict)
        if (filter.length == 0) {
          this.$notify.info({
            content: '未查到结果'
          })
          return
        }
        this.viewData = filter
      },
      async searchNormal() {
        const search = this.current
        const json = await this.entityClass.search('findAllByRouteLinePortLoadIdAndRouteLinePortDischargeId', search)

        let predict = it => true
        if (search.waiPeiCompanyId) {
          predict = it =>
            search.waiPeiCompanyId === it.waiPeiCompanyId
        }
        if (search.fromDate) {
          predict = it =>
            search.waiPeiCompanyId === it.waiPeiCompanyId &&
            it.fromDate.startsWith(search.fromDate)
        }

        const filter = json.map(it => it.data()).filter(predict)
        if (filter.length == 0) {
          this.$notify.info({
            content: '未查到结果'
          })
          return
        }
        this.viewData = filter
        return json
      },
      search() {
        this.searchNormal().catch(error => {
          console.log(error)
          this.$notify.danger({content: '查询失败,请重新查询'})
        })
      }
    },
    computed: {
      filteredDataObj1() {
        return this.port.filter((option) => {
          return option.nameEn
            .toString()
            .includes(this.input1)
        })
      },
      filteredDataObj2() {
        return this.port.filter((option) => {
          return option.nameEn
            .toString()
            .includes(this.input2)
        })
      },
      filteredData() {
        return this.carrier.filter((option) => {
          return option.nameEn
            .toString()
            .includes(this.input)
        })
      },
      ...mapGetters({
        port: 'port',
        carrier: 'carrier',
        country: 'country'
      })
    }

  }
</script>

<style lang="scss" scoped>
  @import '../../node_modules/buefy/src/scss/components/_autocomplete.scss';
  /*@import '../../node_modules/buefy/src/scss/components/_dropdown.scss';*/
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

  section.hero {
    background: #f5f5f5 url('../assets/banner2.jpg') no-repeat;
  }

  a.button:visited {
    color: $primary;
  }
</style>
