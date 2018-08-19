import {db} from "../utils/constants"

export default {

  data() {
    return {
      viewData: [],
      data: [],
      db: db,
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
  async mounted() {
    // const entityClass = this.$spring.Country;
    // await extracted.call(this);
    this.getData()
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
    changePage(page) {
      // console.log(page)
    },
    onTableChange(params) {
      // console.log(params)
      this.getData()
    },
    onSelectChange(keys, items) {
      if (items.length > 0) {
        if (items.length > 1) {
          items.shift()
        }
        this.selectedItems = items;
        this.current = items[items.length - 1]
        this.hasSelect = true;
      } else {
        this.hasSelect = false;
      }
    },
    handleEdit() {
      if (this.selectedItems.length > 1) {
        this.$modal.alert({
          content: '请只选择一项进行修改'
        })
        return
      }
      this.isShow = true;
    },
    handleCreate() {
      this.current = {}
      this.isShow = true;
    },
    handleDelete() {
      if (this.selectedItems.length > 1) {
        this.$modal.alert({
          content: '请只选择一项进行操作'
        })
        return
      }
      this.$modal.confirm({
        content: `确认删除吗?`,
        onOk: this.delete
      })
    },
    save() {
      const entity = new this.entityClass(this.current)
      // find.patchData(this.current)
      // find.save()
      entity.save()
        .then(this.success).catch(this.fail)
    },
    delete() {
      this.entityClass.remove(this.current.id).then(this.success).catch(this.fail)
    },
    success(json) {
      this.getData()
      this.$notify.info({content: '操作成功'})
    },
    fail(err) {
      console.log(err)
      this.$modal.alert({
        content: '操作失败！请联系管理员'
      })
    },
    find() {
      const word = this.word;
      // const text = '' + it.nameCn + it.nameEn + it.code
      const filterNames = this.columns
      const filter = this.data.map(it => it.data()).filter(
        it => filterNames.map(i => it[i]).join().includes(word))
      if (filter.length == 0) {
        this.$notify.warning({
          content: '未查到结果'
        })
        return
      }
      this.viewData = filter
    },
    search() {
    }
  },

}
