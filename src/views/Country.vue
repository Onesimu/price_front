<template>
	<div>
		<div class="tile is-ancestor">
			<div class="tile is-parent">
				<article class="tile is-child box">
					<h4 class="title">国家和地区信息</h4>

					<data-table :data="countries" striped checkable show-index :pagination="pagination" rowKey="countryId" :on-select-change="onSelectChange"
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
                  <a class="button is-danger" @click="handleDelete">
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

						<column label="中文名" field="nameCn"></column>
						<column label="英文名" field="nameEn" sorter="custom"></column>
						<column label="国家代码" field="code">
							<template slot-scope="row">
								<tag type="info">{{ row.code }}</tag>
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
        regionId:regionId,
        current:{},
        pagination:{total:0},
        word:''
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
          json => {
            this.data = json
            this.pagination.total = json.page.totalElements
            const map = json.map(it => it.data())
            this.countries = map
          }
        )
      },
      onTableChange(params) {
        console.log(params);
      },
      onSelectChange(keys, items) {
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
        if(this.selectedItems.length > 1){
          this.$modal.alert({
            content: '请只选择一项进行修改'
          })
          return
        }
        this.isShow = true;
      },
      handleCreate(){
        this.current = {}
        this.isShow = true;
      },
      handleDelete(){
        if(this.selectedItems.length > 1){
          this.$modal.alert({
            content: '请只选择一项进行操作'
          })
          return
        }
        this.$modal.confirm({
          content: `请确认删除: ${this.current.nameCn}`,
          onOk: this.delete
        })
      },
      save(){
        const entity = new this.$spring.Country(this.current)
        // find.patchData(this.current)
        // find.save()
        entity.save()
          .then(this.success).catch(this.fail)
      },
      delete(){
        this.$spring.Country.remove(this.current.countryId).then(this.success).catch(this.fail)
      },
      success(json){
        this.getData()
        this.$notify.info({content: '操作成功'})
      },
      fail(err){
        console.log(err)
        this.$modal.alert({
          content: '操作失败！请联系管理员'
        })
      },
      find(){
        const word = this.word;
        const filter = this.data.map(it => it.data()).filter(
          it => it.nameCn.includes(word) || it.nameEn.includes(word) || it.code.includes(this.word))
        if(filter.length == 0 ){
          this.$modal.alert({
            content: '未查到结果,请更换搜索词,或使用高级搜索'
          })
          return
        }
        this.countries = filter
      },
      search(){}
    },
    computed: {
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
