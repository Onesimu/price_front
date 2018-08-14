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
                <td>Robert Mikels</td>
                <td>Lead Guitar</td>
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
                <td>Karyn Holmberg</td>
                <td>Drums</td>
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
            </tbody>
          </table>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Table Responsive</h4>
          <div class="table-responsive">
            <table class="table is-striped is-narrow">
              <thead>
                <tr>
                  <th></th>
                  <th>Open source projects</th>
                  <th>Year started</th>
                  <th colspan="3">Links</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Open source projects</th>
                  <th>Year started</th>
                  <th colspan="3">Links</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td class="is-icon">
                    <i class="fa fa-android"></i>
                  </td>
                  <td>
                    <a href="#">Android</a>
                  </td>
                  <td>
                    2003
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-github"></i>
                    </a>
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-globe"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="is-icon">
                    <i class="fa fa-firefox"></i>
                  </td>
                  <td>
                    <a href="#">Firefox</a>
                  </td>
                  <td>
                    2003
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-github"></i>
                    </a>
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-globe"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="is-icon">
                    <i class="fa fa-linux"></i>
                  </td>
                  <td>
                    <a href="#">Linux</a>
                  </td>
                  <td>
                    2003
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-github"></i>
                    </a>
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-globe"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="is-icon">
                    <i class="fa fa-wordpress"></i>
                  </td>
                  <td>
                    <a href="#">WordPress</a>
                  </td>
                  <td>
                    2003
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-github"></i>
                    </a>
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </td>
                  <td class="is-icon">
                    <a href="#">
                      <i class="fa fa-globe"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      data: {
        body: {
          username: null,
          password: null
        },
        rememberMe: false
      },
      error: null
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
			json => console.log(json)
		)
		console.log(data);
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
