<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">报价信息</h4>

          <data-table :data="viewData" striped checkable show-index :pagination="pagination" rowKey="id" :on-select-change="onSelectChange"
                      :change="onTableChange" >
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
                <div class="level-item">
                  <button class="button is-info" @click="search">高级搜索</button>
                </div>
              </template>
            </table-toolbar>

            <column label="报价编号" field="sePriceId"></column>
            <column label="装货港" field="routeLinePortLoadId" sorter="custom">
              <template slot-scope="row">
                <span>{{ portName(row.routeLinePortLoadId) }}</span>
              </template>
            </column>
            <column label="卸货港" field="routeLinePortDischargeId" sorter="custom">
              <template slot-scope="row">
                <span>{{ portName(row.routeLinePortDischargeId) }}</span>
              </template>
            </column>
            <column label="中转港" field="transPortId" sorter="custom">
              <template slot-scope="row">
                <span>{{ portName(row.transPortId) }}</span>
              </template>
            </column>
          </data-table>

          <modal title="编辑" :width="820" :is-show="isShow" transition="fadeDown" @close="isShow=false"
                 ok-text="确定" cancel-text="取消" :backdrop-closable="false" :on-ok="save">
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">公司</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="中文名" v-model="current.nameCn">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="email" placeholder="英文名" v-model="current.nameEn">
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">代码</label>
              </div>
              <div class="control">
                <p class="control is-expanded">
                  <input class="input" type="email" placeholder="代码" v-model="current.code">
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">区域</label>
              </div>
              <div class="control">
                <div class="select is-fullwidth">
                  <b-autocomplete
                    :value="portName(current)"
                    @input="value => input = value"
                    placeholder="区域"
                    :data="filteredDataObj"
                    field="nameCn"
                    :open-on-focus="true"
                    @select="option => current.countryId = option.countryId">
                  </b-autocomplete>
                </div>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">备注</label>
              </div>
              <div class="control">
                <textarea class="textarea" placeholder="添加备注信息" :value="selected.countryId">{{selected.id}}</textarea>
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
  export default {

    data() {
      return {
        // country:[],
        selected: {},
        input:''
      }
    },
    mixins: [crud],
    created(){
      this.entityClass = this.$spring.Seaexpressprice
      // this.db.ports = this.data
      // this.country = this.$db.country.map(it => it.data())
    },
    methods:{
      portName(item = this.current.portId){
        // console.log(this.port,this.current)
        const find = this.port.find(it => it.portId == item)
        return find ? find.nameCn : ''
      }
    },
    computed: {
      filteredDataObj() {
        return this.port.filter((option) => {
          return option.nameCn
            .toString()
            .includes(this.input)
          // .toLowerCase()
          // .indexOf(this.current.toLowerCase()) >= 0
        })
      },
      port(){
        return this.$db.port.map(it => it.data())
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import '../../node_modules/buefy/lib/buefy.css';
</style>
