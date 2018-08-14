<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Table</h4>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Instrument</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Instrument</th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td>Misty Abbott</td>
                <td>Bass Guitar</td>
                <td class="is-icon">
                  <a href="#">
                    <i class="fa fa-twitter"></i>
                  </a>
                </td>
                <td class="is-icon">
                  <a href="#">
                    <i class="fa fa-instagram"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>John Smith</td>
                <td>Rhythm Guitar</td>
                <td class="is-icon">
                  <a href="#">

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
//     if (this.$auth.redirect()) {
//       console.log('Redirect from: ' + this.$auth.redirect().from.name)
//     }
    // Can set query parameter here for auth redirect or just do it silently in login redirect.
		
		// var data = await this.$http.get('seaexpressprices');
		// var data = await this.$spring.get('/ports').send().then(json => console.log(this.$spring.Port.jsonToEntityList(json)));
		// var data = await this.$spring.get('/ports').follow('next').then(json => console.log(this.$spring.Port.jsonToEntityList(json)));
		var data = await this.$spring.Port.findAll().then(
			// json => console.log(json[0].get(nameCn))
			json => this.seaexpressprices = json.map(it => it.data())
		)
// 		var data = await this.$spring.Seaexpressprice.findAll()
// 		this.seaexpressprices = data
		console.log('data'+data);
  },
  methods: {

  }
  // filters: {
  //   json: function (value) {
  //     console.log(value)
  //     return value
  //   }
  // }

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
