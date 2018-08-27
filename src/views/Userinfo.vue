<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">用户</h4>

          <data-table :data="viewData" striped checkable show-index :pagination="pagination" rowKey="id" :on-select-change="onSelectChange"
                      :change="onTableChange" >
            <table-toolbar has-refresh has-columns-control>
              <template slot="left" v-if="user.logintype == 2">
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
<!--                <div class="level-item">
                  <button class="button is-info" @click="search">高级搜索</button>
                </div>-->
              </template>
            </table-toolbar>

            <column label="用户名" field="staffName"></column>
            <!--<column label="密码" field="password" sorter="custom"></column>-->
            <column label="电话" field="tel" sorter="custom"></column>
            <column label="邮箱" field="email" sorter="custom"></column>
            <column label="备注" field="remark"></column>
<!--            <column label="国家代码" field="code">
              <template slot-scope="row">
                <tag type="info">{{ row.code }}</tag>
              </template>
            </column>
            <column label="区域" field="regionId" sorter="custom">
              <template slot-scope="row">
                <span>{{ regionId[row.regionId] }}</span>
              </template>
            </column>-->
          </data-table>

          <modal title="编辑" :width="820" :is-show="isShow" transition="fadeDown" @close="isShow=false"
                 ok-text="确定" cancel-text="取消" :backdrop-closable="false" :on-ok="saveUser">

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">用户名</label>
              </div>
              <div class="control">
                <p class="control is-expanded">
                  <input class="input" type="email" placeholder="用户名" v-model="current.staffName">
                </p>
              </div>
            </div>

<!--            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">密码</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="password" placeholder="密码" v-model="current.password">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="password" placeholder="确认密码" v-model="current.confirmPassword">
                </p>
              </div>
            </div>-->

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">联系方式</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="" placeholder="电话" v-model="current.tel">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="email" placeholder="邮箱" v-model="current.email">
                </p>
              </div>
            </div>

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">备注</label>
              </div>
              <div class="control">
                <textarea class="textarea" placeholder="添加备注信息" v-model="current.remark"></textarea>
              </div>
            </div>
          </modal>

        </article>
      </div>
    </div>

  </div>
</template>

<script>
  import crypto from 'crypto'
  import crud from "./crud"
  export default {

    data() {
      return {
      }
    },
    mixins: [crud],
    created(){
      this.entityClass = this.$spring.Userinfo
      this.columns = ['staffName','tel','email']
    },
    methods:{
      saveUser(){
        const password = this.current.tel || '999999';
        this.current.password = crypto.createHash('md5').update(password).digest('hex')
        this.current.logintype = 0
        this.save()
      }
    },
    computed:{
      user(){
        return this.$store.getters.user
      }
    }
  }
</script>

<style lang="scss">
</style>
