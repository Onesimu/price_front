<template>
	<div>
		<div class="tile is-ancestor">
			<div class="tile is-parent">
				<article class="tile is-child box">
					<h4 class="title">国家和地区信息</h4>

					<data-table :data="countries" striped checkable show-index :pagination="pagination" rowKey="countryId" :on-select-change="onSelectChange"
					    :change="onTableChange">
						<table-toolbar has-refresh has-columns-control>
							<template slot="left">
								<div class="level-item">
									<a class="button is-primary" @click="handleEdit" :class="{'is-disabled': !hasSelect}">
										<span class="icon is-small">
											<i class="fa fa-edit"></i>
										</span>
										<span>查看</span>
									</a>
								</div>
							</template>
							<template slot="right">
								<div class="level-item">
									<p class="control has-addons">
										<input class="input" type="text" placeholder="查找条件">
										<button class="button">搜索</button>
									</p>
								</div>
							</template>
						</table-toolbar>

						<column label="中文名" field="nameCn"></column>
						<column label="英文名" field="nameEn" sorter="custom"></column>
						<column label="国家代码" field="code">
							<template slot-scope="row">
								<tag type="primary">{{ row.code }}</tag>
							</template>
						</column>
						<column label="区域" field="regionId" sorter="custom">
              <template slot-scope="row">
                <span>{{ regionId[row.regionId] }}</span>
              </template>
            </column>
					</data-table>

					<modal title="编辑" :width="820" :is-show="isShow" transition="fadeDown" @close="isShow=false"
                 ok-text="确定" cancel-text="取消" :backdrop-closable="false" :on-ok="save">
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">国家</label>
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
                <label class="label">国家代码</label>
              </div>
              <div class="control">
                <p class="control is-expanded">
                  <input class="input" type="email" placeholder="两位代码" v-model="current.code">
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">区域</label>
              </div>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="current.regionId">
                    <option v-for="it,idx in regionId" :key="idx" :value="idx">{{it}} </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">备注</label>
              </div>
              <div class="control">
                <textarea class="textarea" placeholder="添加备注信息"></textarea>
              </div>
            </div>
					</modal>
				</article>
			</div>
		</div>

	</div>
</template>
<script>
  import {regionId} from '../utils/constants'
  export default {

    data() {
      return {
        countries: [],
        data:[],
        hasSelect: false,
        isShow: false,
        selectedItems: [],
        bordered: true,
        striped: false,
        narrow: false,
        regionId:regionId,
        current:{},
        pagination:{total:0}
      }
    },
    async mounted() {
      // await extracted.call(this);
      this.getData()
    },
    methods: {
      async getData() {
        const size = this.pagination.total || 0
        var data = await this.$spring.Country.findAll({size:size}).then(
          // json => this.countries = json.map(it => it.data().region = regionId[it.data().regionId])
          json => {
            this.data = json
            // console.log(json)
            this.pagination.total = json.page.totalElements
            const map = json.map(it => it.data())
            // map.forEach(it => it.region = regionId[it.regionId])
            this.countries = map
          }
        )
      },
      onTableChange(params) {
        console.log(params);
      },
      onSelectChange(keys, items) {
        console.log(keys, items);
        this.selectedItems = items;
        if (items.length > 0) {
          // this.current = this.data.find(it => it.countryId = items[0].countryId)
          this.current = items[0]
          this.hasSelect = true;
        } else {
          this.hasSelect = false;
        }
      },
      handleEdit() {
        this.isShow = true;
      },
      save(){
        // const current = this.selectedItems[0]
        const find = this.data.find(it => it.id == this.current.countryId)
        // console.log(this.current)
        // console.log(find)

        const entity = new this.$spring.Country(find.data())
        // console.log(entity)
        // find.patchData(this.current)
        // find.save()
        entity.save()
          .then( json => {
            this.getData()
          // console.log(json)
            this.$notify.info({content: '修改成功'})
          }
        ).catch(err => {
          console.log(err)
          this.$modal.alert({
            content: '操作失败！请联系管理员'
          })
          }
        )
      }
    },
    computed: {
      // pagination: {
      //   get() {
      //     return {
      //       total: this.data.page.totalElements,
      //     };
      //   },
      //   set(newValue) {}
      // },
      // current(){ return this.selectedItems.leagth > 0 ? this.selectedItems[0] : new this.$spring.Country()},
      dataSource2() {
        return data.slice(0, 9);
      },
    },

  }
</script>


<style lang="scss">
	.table-responsive {
		display: block;
		width: 100%;
		min-height: .01%;
		overflow-x: auto;
	}
</style>
