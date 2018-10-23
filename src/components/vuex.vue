<template>
  <div class="vuex-demo">
    <h1>{{title}}</h1>
    <h1>{{msg}}</h1>
    <h2>{{localComputed}}</h2>
    <div class="todo-container">
      <div>
        <span>实现双向绑定</span>
        <input type="text" :value="msg" @input="(e) => changeTitle(e.target.value)" >
      </div>
      <div class="type-list">
        <div :key="type" class="type" v-for="type in types">
          <button :class="{ active: type === currentType }" @click="changeType(type)">{{ type }}</button>
        </div>
      </div>
      <div class="todo-list">
        <div v-if="data.length === 0">加载中...</div>
        <div v-else class="todo-item" :key="`todo-${item.id}`" v-for="item in data">
          <div class="head">
            <span class="title">{{ item.name }}</span>
            <span class="status">{{ item.status }}</span>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="footer">
            <div class="operation">
              <button v-if="item.status === '待完成'" @click="changeItemType({ item, type: '进行中' })">开始</button>
              <button v-if="item.status === '待完成'" @click="changeItemType({ item, type: '已取消' })">取消</button>
              <button v-if="item.status === '进行中'" @click="changeItemType({ item, type: '已完成' })">完成</button>
            </div>
            <div class="time">
              <span class="create-time">创建时间：{{ new Date(item.createTime).toUTCString() }}</span>
              <span class="update-time">更新时间：{{ new Date(item.updateTime).toUTCString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  created () {
    this.getList()
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations({
      changeTitle: 'todo/CHANGE_TITLE',
      changeType: 'todo/UPDATE_TYPE',
      changeItemType: 'todo/UPDATE_ITEM_STATUS'
    }),
    ...mapActions({
      getList: 'todo/getList'
    })
  },
  computed: {
    localComputed () {
      return '我是当前组件的计算属性'
    },
    ...mapState({
      msg: ({ todo: { msg } }) => msg,
      types: ({ todo: { typeList } }) => typeList,
      data: ({ todo: { data } }) => data,
      currentType: ({ todo: { currentType } }) => currentType
    }),
    ...mapGetters({
      title: 'todo/title'
    })
  }
}
</script>

<style lang="scss" scoped>
.vuex-demo {
  input {
    border: 1px solid;
    padding: 2px 10px;
  }
  .todo-container {
    .type-list {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-around;
      .type {
        button {
          font-size: 16px;
          background: aliceblue;
          &.active {
            background: red;
            color: #fff;
          }
        }
      }
    }
    .todo-list {
      .todo-item {
        margin-bottom: 10px;
        text-align: left;
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #666;
        box-shadow: 0 0 3px #999;
        background: aliceblue;
        .head {
          border-bottom: 1px solid #666;
          padding: 5px 0;
        }
        .content {
          padding: 5px 0;
          border-bottom: 1px solid #666;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          .operation {
            display: flex;
            align-items: center;
          }
          .time {
            font-size: 12px;
            span {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
