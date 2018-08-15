<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">港口信息</h4>
          <table class="table">
            <thead>
              <tr>
                <th>港口中文名</th>
                <th>港口英文名</th>
                <th>港口代码</th>
                <th>国家</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="it in ports">
                <td>{{it.nameCn}}</td>
                <td>{{it.nameEn}}</td>
                <td>{{it.code}}</td>
				<td>{{it.countryNameCn}}</td>

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
			ports:[]
    }
  },
  async mounted () {
		var data = await this.$spring.PortView.findAll().then(
			json => this.ports = json.map(it => it.data())
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
