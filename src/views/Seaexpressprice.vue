<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">报价信息</h4>

          <data-table :data="viewData" striped checkable :pagination="pagination" rowKey="id"
                      :on-select-change="onSelectChange"
                      :change="onTableChange">
            <table-toolbar has-refresh has-columns-control>
              <template slot="left">
                <div class="level-item">
                  <a class="button is-primary" @click="handleEdit" :class="{'is-disabled': !hasSelect}">
										<span class="icon is-small">
											<i class="fa fa-edit"></i>
										</span>
                    <span>修改</span>
                  </a>
                </div>
                <div class="level-item">
                  <a class="button is-info" @click="handleCreate">
										<span class="icon is-small">
											<i class="fa fa-plus"></i>
										</span>
                    <span>新增</span>
                  </a>
                </div>
                <div class="level-item">
                  <a class="button is-danger" @click="handleDelete" :class="{'is-disabled': !hasSelect}">
										<span class="icon is-small">
											<i class="fa fa-remove"></i>
										</span>
                    <span>删除</span>
                  </a>
                </div>
              </template>
              <template slot="right">
                <div class="level-item">
                  <p class="control has-addons">
                    <input class="input" placeholder="查找条件" v-model="word">
                    <button class="button" @click="find">搜索</button>
                  </p>
                </div>
                <!--                <div class="level-item">
                                  <button class="button is-info" @click="search">高级搜索</button>
                                </div>-->
              </template>
            </table-toolbar>

            <!--<column label="报价编号" field="sePriceId"></column>-->
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
            <column label="中转港" field="transPortId">
              <template slot-scope="row">
                <span>{{ portName(row.transPortId) }}</span>
              </template>
            </column>
            <!--<column label="生效日期" field="fromDate"></column>-->
            <column label="20GP" field="publicPrice_20Gp" sorter="custom"></column>
            <column label="40GP" field="publicPrice_40Gp" sorter="custom"></column>
            <column label="40HQ" field="publicPrice_40Hq" sorter="custom"></column>
            <column label="45HQ" field="publicPrice_45Hq" sorter="custom"></column>
            <column label="40RD" field="publicPrice_40Rd" sorter="custom"></column>
            <column label="公司" field="waiPeiCompanyId">
              <template slot-scope="row">
                <span>{{ carrierName(row.waiPeiCompanyId) }}</span>
              </template>
            </column>
            <column label="船期" field="schedule"></column>
            <column label="运输模式" field="transMode"></column>
            <column label="生效日期" field="fromDate" sorter="custom">
              <template slot-scope="row">
                <span>{{ getDate(row.fromDate) }}</span>
                <!--<span>{{ row.fromDate && row.fromDate.toLocaleDateString() }}</span>-->
              </template>
            </column>
            <column label="备注" field="remark"></column>
          </data-table>

          <modal title="编辑" :width="820" :is-show="isShow" transition="fadeDown" @close="isShow=false"
                 ok-text="确定" cancel-text="取消" :backdrop-closable="false" :on-ok="save">

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">港口</label>
              </div>
              <div class="control" is-grouped>
                <div class="select is-expanded">
                  <b-autocomplete
                    :value="portName(current.routeLinePortLoadId)"
                    @input="value => input1 = value"
                    placeholder="起始港"
                    :data="filteredDataObj1"
                    field="nameEn"
                    :open-on-focus="true"
                    @select="option => current.routeLinePortLoadId = option.portId">
                  </b-autocomplete>
                </div>

                <div class="select is-expanded">
                  <b-autocomplete
                    :value="portName(current.transPortId)"
                    @input="value => input1 = value"
                    placeholder="中转港"
                    :data="filteredDataObj1"
                    field="nameEn"
                    :open-on-focus="true"
                    @select="option => current.transPortId = option.portId">
                  </b-autocomplete>
                </div>

                <div class="select is-expanded">
                  <b-autocomplete
                    :value="portName(current.routeLinePortDischargeId)"
                    @input="value => input2 = value"
                    placeholder="目的港"
                    :data="filteredDataObj2"
                    field="nameEn"
                    :open-on-focus="true"
                    @select="option => current.routeLinePortDischargeId = option.portId">
                  </b-autocomplete>
                </div>
              </div>
            </div>

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">承运公司</label>
              </div>
              <div class="control">
                <div class="select is-fullwidth">
                  <b-autocomplete
                    :value="carrierName(current.waiPeiCompanyId)"
                    @input="value => input3 = value"
                    placeholder="承运公司"
                    :data="filteredData"
                    field="nameEn"
                    :open-on-focus="true"
                    @select="option => current.waiPeiCompanyId = option.carrierId">
                  </b-autocomplete>
                </div>
              </div>
            </div>

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">运价</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="number" placeholder="20GP" v-model="current.publicPrice_20Gp">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="number" placeholder="40GP" v-model="current.publicPrice_40Gp">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="number" placeholder="40HQ" v-model="current.publicPrice_40Hq">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="number" placeholder="45HQ" v-model="current.publicPrice_45Hq">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="number" placeholder="40RD" v-model="current.publicPrice_40Rd">
                </p>
              </div>
            </div>

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">船期</label>
              </div>
              <div class="control">
                <p class="control is-fullwidth">
                  <!--<input class="input" placeholder="船期" v-model="current.schedule">-->
                  <checkbox-group v-model="scheduleArray">
                    <checkbox val="MON" :checked="scheduleArray.includes('MON')">MON</checkbox>
                    <checkbox val="TUE" :checked="scheduleArray.includes('TUE')">TUE</checkbox>
                    <checkbox val="WED" :checked="scheduleArray.includes('WED')">WED</checkbox>
                    <checkbox val="THU" :checked="scheduleArray.includes('THU')">THU</checkbox>
                    <checkbox val="FRI" :checked="scheduleArray.includes('FRI')">FRI</checkbox>
                    <checkbox val="SAT" :checked="scheduleArray.includes('SAT')">SAT</checkbox>
                    <checkbox val="SUN" :checked="scheduleArray.includes('SUN')">SUN</checkbox>
                  </checkbox-group>
                </p>
              </div>
            </div>

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">生效日期</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <!--<input class="input" type="date" placeholder="生效日期" v-model="current.fromDate">-->
                  <datepicker placeholder="生效日期" v-model="current.fromDate"></datepicker>
                </p>
                <p class="control is-expanded">
                  <input class="input" placeholder="运输模式" v-model="current.transMode">
                </p>
              </div>
            </div>

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">备注</label>
              </div>
              <div class="control">
                <textarea class="textarea" placeholder="添加备注信息" v-model="current.remark"></textarea>
              </div>
            </div>
          </modal>

        </article>
      </div>
    </div>

  </div>
</template>

<script>
  import crud from "./crud"
  import {getDate} from "../utils/constants";

  export default {

    data() {
      return {
        // country:[],
        selected: {},
        input1: '',
        input2:'',
        input3:'',
      }
    },
    mixins: [crud],
    created() {
      this.entityClass = this.$spring.Seaexpressprice
      // this.db.ports = this.data
      // this.country = this.$db.country.map(it => it.data())
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
    },
    computed: {
      filteredData() {
        return this.carrier.filter((option) => {
          return option.nameEn
            .toString()
            .includes(this.input3)
        })
      },
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
      port() {
        return this.$store.state.app.db.port.map(it => it.data())
      },
      carrier() {
        return this.$store.state.app.db.carrier.map(it => it.data())
      },
      scheduleArray: {
        get() {
          const val = this.current.schedule ? this.current.schedule.split('/') : [];
          // console.log(this.current.schedule, val)
          return val
        },
        set(val) {
          this.current.schedule = (val.join('/'))
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  /*@import '../../node_modules/buefy/lib/buefy.css';*/
</style>
