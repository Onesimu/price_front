<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <div class="center-text">

            <h4 class="title">出口运价</h4>
                <div class="box">
                  <ul>
                    <li>
                      <span ><a class="button is-info is-large">整箱</a></span>
                      <span ><a class="button is-large">拼箱</a></span>
                    </li>
                  </ul>
                </div>

            <form>

              <div class="field">
                <p class="control is-fullwidth is-large has-addons-right">
                  <b-autocomplete
                   :size="'is-large'"
                    :expanded="true"
                    :value="portName(current.routeLinePortLoadId)"
                    @input="value => input1 = value"
                    placeholder="起始港"
                    :data="filteredDataObj1"
                    field="nameCn"
                    :open-on-focus="true"
                    @select="option => current.routeLinePortLoadId = option ? option.portId : ''">
                  </b-autocomplete>
                </p>

              </div>

              <div class="field">
                <p class="control is-fullwidth is-large has-addons-right">

                  <b-autocomplete
                    :size="'is-large'"
                    :expanded="true"
                    :value="portName(current.routeLinePortDischargeId)"
                    @input="value => input2 = value"
                    placeholder="目的港"
                    :data="filteredDataObj2"
                    field="nameCn"
                    :open-on-focus="true"
                    @select="option => current.routeLinePortDischargeId = option ? option.portId : ''">
                  </b-autocomplete>
                </p>
              </div>

              <router-link class="button is-info is-large is-fullwidth"
                           :to="{ path:'info', query: { routeLinePortLoadId: current.routeLinePortLoadId,
                           routeLinePortDischargeId:current.routeLinePortDischargeId }}">
                <span class="icon is-medium">
                  <i class="fa fa-search"></i>
                </span>
                <span>搜索</span>
              </router-link>
              <br>
            </form>

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
  import { mapActions, mapGetters } from 'vuex'

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
      this.columns = ['routeLinePortLoadId','routeLinePortDischargeId','waiPeiCompanyId']
    },
    methods: {
      portName(item = this.current.portId) {
        const find = this.port.find(it => it.portId == item)
        return find ? find.nameCn + `(${this.countryName(find.countryId)})` : ''
      },
      carrierName(item = this.current.waiPeiCompanyId){
        const find = this.carrier.find(it => it.carrierId == item)
        return find ? find.nameCn : ''
      },
      countryName(item = this.current.countryId){
        const find = this.country.find(it => it.countryId == item)
        return find ? find.nameCn : ''
      },
      getDate: getDate,
      find() {
        const word = this.word;
        const filter = this.data.map(it => it.data()).filter(
          it => [this.portName(it.routeLinePortLoadId),this.portName(it.routeLinePortDischargeId),this.carrierName(it.carrierId)]
            .join().includes(word))
        if (filter.length == 0) {
          this.$notify.warning({
            content: '未查到结果'
          })
          return
        }
        this.viewData = filter
      },
      localSearch(){
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
      async search() {
        const search = this.current
        const json = await this.entityClass.search('findAllByRouteLinePortLoadIdAndRouteLinePortDischargeId', search)

        let predict = it => true
        if(search.waiPeiCompanyId){
          predict = it =>
            search.waiPeiCompanyId === it.waiPeiCompanyId
        }
        if(search.fromDate){
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
      }
    },
    computed: {
      filteredDataObj1() {
        return this.port.filter((option) => {
          return option.nameCn
            .toString()
            .includes(this.input1)
        })
      },
      filteredDataObj2() {
        return this.port.filter((option) => {
          return option.nameCn
            .toString()
            .includes(this.input2)
        })
      },
      filteredData() {
        return this.carrier.filter((option) => {
          return option.nameCn
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

  section.hero{
    background-color: #f5f5f5;
    /*background-image: url('../assets/banner_main.JPG');*/
  }

  a.button:visited{
    color: $primary;
  }
</style>
