<template>
  <div class="content has-text-centered main-container">
    <h1 class="is-title is-bold">修改用户信息</h1>

    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
          <form v-on:submit.prevent="login">
            <label class="label">原密码</label>
            <p class="control">
              <input v-model="data.body.old" class="input" type="password" placeholder="请输入原密码" required>
            </p>
            <hr>
            <label class="label">新密码</label>
            <p class="control">
              <input v-model="data.body.password" class="input" type="password" placeholder="请输入新密码" required>
            </p>
            <label class="label">确认密码</label>
            <p class="control">
              <input v-model="data.body.passwordConfirm" class="input" type="password" placeholder="请输入确认密码" required>
            </p>

            <hr>
            <p class="control">
              <button type="submit" class="button is-primary is-pulled-right">修改</button>
              <button class="button is-default">取消</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import crypto from 'crypto'
  export default {

    data () {
      return {
        data: {
          body: {
            password: '',
            passwordConfirm:'',
            old:''
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
        const entityClass = this.$spring.Userinfo;
        const entity = new entityClass(this.$store.getters.user);
        entity.patchData(body)
        entity.modifyFields = ['password']
        const data = await entity.save()
        if (data) {
          this.$store.commit('user',data)
          this.$router.push('/manual')
          this.$notify.info({content: '修改成功'})
        } else {
          this.$notify.danger({content: '修改失败'})
        }
      },
      async login () {
        const body = this.data.body;
        if(body.password != body.passwordConfirm){
          this.$notify.danger({content:'确认密码不一致'})
          return
        }
        const old = crypto.createHash('md5').update(body.old).digest('hex')
        if(old != this.$store.getters.user.password){
          this.$notify.danger({content:'原密码不正确'})
          return
        }
        body.password = crypto.createHash('md5').update(body.password).digest('hex')
        this.findUser(body).catch(err => {
          console.log(err)
          this.$notify.danger({content: '修改失败'})
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
