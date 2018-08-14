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
						<column label="区域" field="regionId" sorter="custom"></column>
					</data-table>
					<modal title="查看" :width="520" :is-show="isShow" transition="fadeDown" @close="isShow=false">
						<h4>选中了：</h4>
						<p>
							<ul>
								<li v-for="item in selectedItems">
									{{ item.nameCn }}({{ item.nameEn }} | {{ item.code }})
								</li>
							</ul>
						</p>
					</modal>
				</article>
			</div>
		</div>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				countries: [],
				hasSelect: false,
				isShow: false,
				selectedItems: [],
				bordered: true,
				striped: false,
				narrow: false,
			}
		},
		async mounted() {
			var data = await this.$spring.Country.findAll().then(
				json => this.countries = json.map(it => it.data())
			)
		},
		methods: {
			onTableChange(params) {
				console.log(params);
			},
			onSelectChange(keys, items) {
				console.log(keys, items);
				this.selectedItems = items;
				if (items.length > 0) {
					this.hasSelect = true;
				} else {
					this.hasSelect = false;
				}
			},
			handleEdit() {
				this.isShow = true;
			},
		},
		computed: {
			pagination: {
				get() {
					return {
						total: this.countries.length,
					};
				},
				set(newValue) {}
			},
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
