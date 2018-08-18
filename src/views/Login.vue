<template>
<div class="content has-text-centered">
  <h1 class="is-title is-bold">登录</h1>

  <div class="columns is-vcentered">
    <div class="column is-6 is-offset-3">
      <div class="box">
        <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
        <form v-on:submit.prevent="login">
          <label class="label">用户名</label>
          <p class="control">
            <input v-model="data.body.username" class="input" type="text" placeholder="请输入用户名">
          </p>
          <label class="label">密码</label>
          <p class="control">
            <input v-model="data.body.password" class="input" type="password" placeholder="请输入密码">
          </p>

<!--          <p class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="data.rememberMe">
              Remember me
            </label>
          </p> -->

          <hr>
          <p class="control">
            <button type="submit" class="button is-primary">登录</button>
            <button class="button is-default">取消</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import "regenerator-runtime/runtime";
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
  mounted () {
  },
  methods: {
    async findUser (body) {
      const data = await this.$spring.Userinfo.search('findByStaffNameAndPassword', body)
      if (data.data()) {
        this.$db.user = data.data()
        this.$router.push('/manual')
        this.$notify.info({content: '欢迎登录'})
      } else {
        this.$notify.danger({content: '登录失败'})
      }
    },
    async login () {
      const body = this.data.body;
      body.staffName = body.username
      this.findUser(body).catch(err => {
        console.log(err)
        this.$notify.danger({content: '用户名或密码错'})
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.is-title {
    text-transform: capitalize;
}
</style>
