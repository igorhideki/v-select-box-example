<template>
  <div id="app">
    <h1>v-select box example</h1>
    <ul class="list-inline">
      <li>
        <v-select-box :options="options"></v-select-box>
      </li>
      <li>
        <v-select-box :options="options"></v-select-box>
      </li>
      <li>
        <v-select-box :options="options"></v-select-box>
      </li>
    </ul>
  </div>
</template>

<script>
  // import api from '../api'
  import api from './request'
  import VSelectBox from 'v-select-box'
  export default {
    name: 'app',
    components: {
      VSelectBox
    },
    methods: {
      onSelect ({ item, multiSelect }) {
        console.log(item, multiSelect)
      },
      onSearch (query) {
        return api.get({ ...query }).then(({ Page, PageCount, ItemsPerPage, Result }) => {
          this.options.page = Page
          this.options.pageCount = PageCount
          this.options.itemsPerPage = ItemsPerPage
          this.options.items = Result
        })
      },
      loadMore (params) {
        return api.get({ ...params }).then(({ Page, PageCount, ItemsPerPage, Result }) => {
          this.options.page = Page
          this.options.pageCount = PageCount
          this.options.itemsPerPage = ItemsPerPage
          this.options.items = this.options.items.concat(Result)
        })
      },
      clearItems () {
        this.options.items = []
      }
    },
    data () {
      return {
        options: {
          itemsPerPage: 10,
          onSelect: this.onSelect,
          onSearch: this.onSearch,
          page: 1,
          pageCount: 1,
          loadMore: this.loadMore,
          clearItems: this.clearItems,
          items: [],
          params: {
            search: 'name'
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .m-r {
    margin-right: 15px;
  }
</style>
