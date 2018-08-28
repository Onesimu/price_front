<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">

          <div class="column has-background-info">
            <div class="field is-horizontal">

              <div class="field-label is-normal">
                <label class="label">From</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <span class="tag is-medium is-white has-text-weight-semibold">起始港</span>
                  <div class="select is-expanded">
                    <b-autocomplete
                      :value="portName(current.routeLinePortLoadId)"
                      @input="value => input1 = value"
                      placeholder="起始港"
                      :data="filteredDataObj1"
                      field="nameEn"
                      :open-on-focus="true"
                      @select="option => current.routeLinePortLoadId = option ? option.portId : ''">
                    </b-autocomplete>
                  </div>
                </div>

                <div class="field-label is-normal">
                  <label class="label">To</label>
                </div>

                <div class="field">
                  <span class="tag is-medium is-white has-text-weight-semibold">目的港</span>
                  <div class="select is-expanded">
                    <b-autocomplete
                      :value="portName(current.routeLinePortDischargeId)"
                      @input="value => input2 = value"
                      placeholder="目的港"
                      :data="filteredDataObj2"
                      field="nameEn"
                      :open-on-focus="true"
                      @select="option => current.routeLinePortDischargeId = option ? option.portId : ''">
                    </b-autocomplete>
                  </div>
                </div>

                <div class="field is-expanded">
                  <button class="button is-warning" @click="search">搜索</button>
                </div>

              </div>
            </div>
          </div>

          <data-table :data="viewData" :pagination="pagination" rowKey="id" :change="onTableChange">
            <table-toolbar has-columns-control>
              <template slot="left">
                <div class="field is-horizontal">
                  <span class="tag is-medium is-white has-text-weight-semibold">船公司</span>
                  <div class="control">
                    <div class="select">
                      <b-autocomplete
                        :value="carrierName(current.waiPeiCompanyId)"
                        @input="value => input3 = value"
                        placeholder="承运公司"
                        :data="filteredData"
                        field="nameEn"
                        :open-on-focus="true"
                        @select="findByCompany">
                      </b-autocomplete>
                    </div>
                  </div>
                </div>
              </template>
              <template slot="right">
                  <span class="tag is-medium is-white has-text-weight-semibold">开航日</span>
                  <checkbox-group v-model="scheduleArray">
                    <checkbox val="MON" @change="findBySchedule">MON</checkbox>
                    <checkbox val="TUE" @change="findBySchedule">TUE</checkbox>
                    <checkbox val="WED" @change="findBySchedule">WED</checkbox>
                    <checkbox val="THU" @change="findBySchedule">THU</checkbox>
                    <checkbox val="FRI" @change="findBySchedule">FRI</checkbox>
                    <checkbox val="SAT" @change="findBySchedule">SAT</checkbox>
                    <checkbox val="SUN" @change="findBySchedule">SUN</checkbox>
                  </checkbox-group>

                <div class="column is-large"></div>
                <div class="field">
                  <button class="button is-primary" @click="refresh">刷新</button>
                </div>
              </template>
            </table-toolbar>

            <!--<column label="报价编号" field="sePriceId"></column>-->

            <!--          <column label="起始港" field="routeLinePortLoadNameCn"></column>
                        <column label="目的港" field="routeLinePortDischargeNameCn"></column>
                        <column label="中转港" field="transPortNameCn"></column>-->

            <column label="起始港" field="routeLinePortLoadId">
              <template slot-scope="row">
                <span>{{ portName(row.routeLinePortLoadId) }}</span>
              </template>
            </column>
            <column label="目的港" field="routeLinePortDischargeId">
              <template slot-scope="row">
                <span>{{ portName(row.routeLinePortDischargeId) }}</span>
              </template>
            </column>

            <!--<column label="生效日期" field="fromDate"></column>-->
            <column label="20GP" field="publicPrice_20Gp" sorter="custom"></column>
            <column label="40GP" field="publicPrice_40Gp" sorter="custom"></column>
            <column label="40HQ" field="publicPrice_40Hq" sorter="custom"></column>
            <column label="45HQ" field="publicPrice_45Hq" sorter="custom"></column>
            <column label="40RD" field="publicPrice_40Rd" sorter="custom"></column>
            <column label="船司" field="waiPeiCompanyId">
              <template slot-scope="row">
                <span>{{ carrierName(row.waiPeiCompanyId) }}</span>
              </template>
            </column>
            <!--<column label="公司" field="waiPeiCompanyNameCn"></column>-->
            <column label="船期" field="schedule"></column>
            <column label="运输模式" field="transMode"></column>
            <column label="生效日期" field="fromDate" sorter="custom">
              <template slot-scope="row">
                <span>{{ getDate(row.fromDate) }}</span>
                <!--<span>{{ row.fromDate && row.fromDate.toLocaleDateString() }}</span>-->
              </template>
            </column>
          </data-table>


        </article>
      </div>
    </div>

  </div>
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
        input3: '',
        localeOption: {
          locale: zh,
        },
        viewData: [],
        data: [],
        hasSelect: false,
        isShow: false,
        selectedItems: [],
        current: {},
        pagination: {
          total: 0
        },
        word: '',
        entityClass: {}
      }
    },
    // mixins: [crud],
    created() {
      this.entityClass = this.$spring.SeaexpresspriceView
      this.columns = ['routeLinePortLoadId', 'routeLinePortDischargeId', 'waiPeiCompanyId']
    },
    mounted() {
      const query = this.$route.query;
      // console.log(query)
      if (query.routeLinePortDischargeId && query.routeLinePortDischargeId) {
        this.current = query
        this.search()
      } else {
        this.getData()
      }
    },
    methods: {
      async getData() {
        const size = this.pagination.total || 0
        await this.entityClass.findAll({size: size}).then(
          json => {
            this.data = json
            this.pagination.total = json.page.totalElements
            const map = json.map(it => {
              it.data().id = it.id
              return it.data()
            })
            this.viewData = map
          }
        )
      },
      onTableChange(params) {
        // console.log(params)
        //this.getData()
      },
      refresh(){
        // this.getData()
        // this.current = {}
        // this.scheduleArray = []
        location.replace('/info')
        // this.$router.replace('/info')
      },
      portName(item = this.current.portId) {
        // console.log(this.port,this.current)
        const find = this.port.find(it => it.portId == item)
        return find ? find.nameEn : ''
      },
      carrierName(item = this.current.waiPeiCompanyId) {
        const find = this.carrier.find(it => it.carrierId == item)
        return find ? find.nameEn : ''
      },
      getDate: getDate,
      findBySchedule(option){
        console.log(option)
      // alert(option)
      },
      findByCompany(option){
        this.current.waiPeiCompanyId = option && option.carrierId
        const search = this.current
        let predict = it => true
        if (search.waiPeiCompanyId) {
          predict = it =>
            search.waiPeiCompanyId === it.waiPeiCompanyId
        }

        const filter = this.viewData.filter(predict)
        if (filter.length == 0) {
          this.$notify.info({
            content: '未查到结果'
          })
          return
        }
        this.viewData = filter
        this.pagination.total = filter.length
      },
      async searchNormal() {
        const search = this.current
        const json = await this.entityClass.search('findAllByRouteLinePortLoadIdAndRouteLinePortDischargeId', search)

        if (json.length == 0) {
          this.$notify.info({
            content: '未查到结果'
          })
          return
        }
        const filter = json.map(it => it.data())
        this.viewData = this.data = filter
      },
      search() {
        this.searchNormal().catch(error => {
          console.log(error)
          this.$notify.danger({content: '查询失败,请重新查询'})})
      }
    },
    computed: {
      filteredData() {
        return this.carrier.filter((option) => {
          return option.nameEn
            .toString()
            .includes(this.input3.toUpperCase())
        })
      },
      filteredDataObj1() {
        return this.port.filter((option) => {
          return option.nameEn
            .toString()
            .includes(this.input1.toUpperCase())
        })
      },
      filteredDataObj2() {
        return this.port.filter((option) => {
          return option.nameEn
            .toString()
            .includes(this.input2.toUpperCase())
        })
      },
      scheduleArray: {
        get() {
          const val = this.current.schedule ? this.current.schedule : [];
          // console.log(this.current.schedule, val)
          return val
        },
        set(val) {
          // console.log(this.current.schedule, val)
          this.current.schedule = val

          if(val == []){
            this.refresh()
            return
          }

          const search = this.current
          let predict = it => true
          if (search.schedule) {
            predict = it =>
               it.schedule.split('/').some(t => search.schedule.includes(t))
          }

          const filter = this.viewData.filter(predict)

          this.viewData = filter
          this.pagination.total = filter.length
        }
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
	.column {
		margin-bottom: 10px
	}
</style>
