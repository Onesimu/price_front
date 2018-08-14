<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">航运公司</h4>
          <table class="table">
            <thead>
              <tr>
                <th>中文名</th>
                <th>英文名</th>
                <th>代码</th>
                <th>国家</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="it in carriers">
                <td>{{it.nameCn}}</td>
                <td>{{it.nameEn}}</td>
                <td>{{it.code}}</td>
								<td>{{it.countryId}}</td>

              </tr>

            </tbody>
          </table>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
export default {

  data () {
    return {
			carriers:[]
    }
  },
  async mounted () {
		var data = await this.$spring.Carrier.findAll().then(
			json => this.carriers = json.map(it => it.data())
		)
  },
  methods: {

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
