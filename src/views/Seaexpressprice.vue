<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">报价信息</h4>
          <table class="table">
            <thead>
              <tr>
								<th>报价编号</th>
                <th>hostId</th>
                <th>卸货港</th>
								<th>装货港ID</th>
								<th>中转港</th>
								<th>运输条款</th>
								<th>创建时间</th>
								<th>修改时间</th>

              </tr>
            </thead>

            <tbody>
              <tr v-for="it in seaexpressprices">
								<td>{{it.sePriceId}}</td>
                <td>{{it.hostId}}</td>
								<td>{{it.routeLinePortDischargeId}}</td>
								<td>{{it.routeLinePortLoadId}}</td>
								<td>{{it.transPortId}}</td>
								<td>{{it.transTypeId}}</td>
								<td>{{it.createTime}}</td>
								<td>{{it.updateTime}}</td>

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
			seaexpressprices:[]
    }
  },
  async mounted () {
		var data = await this.$spring.Seaexpressprice.findAll().then(
			json => this.seaexpressprices = json.map(it => it.data())
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
