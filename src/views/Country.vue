<template>
	<div>
		<div class="tile is-ancestor">
			<div class="tile is-parent">
				<article class="tile is-child box">
					<h4 class="title">国家和地区信息</h4>

					<data-table :data="viewData" striped checkable show-index :pagination="pagination" rowKey="countryId" :on-select-change="onSelectChange"
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
  import crud from "./crud"
  export default {

    data() {
      return {
        regionId:regionId,
      }
    },
    mixins: [crud],
    created(){
      this.entityClass = this.$spring.Country
      // this.db.ports = this.data
    }
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
