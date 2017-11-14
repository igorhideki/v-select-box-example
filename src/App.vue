<template>
  <div id="app">
    <h1>v-select box example</h1>
    <div class="row">
      <div class="col-md-12">
        <ul class="list-inline">
          <li>
            <v-select-box :options="options"></v-select-box>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  import VSelectBox from 'v-select-box'
  export default {
    name: 'app',
    components: {
      VSelectBox
    },
    methods: {
      onSelect ({ item, multiSelect }) {
        const { selected, id } = item
        const selectedItem = this.options.items.find(i => i.id === id)
        if (!multiSelect) {
          this.options.items = this.options.items.map(i => {
            i.selected = false
            return i
          })
        }
        if (selectedItem) selectedItem.selected = !selected
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
          itemsPerPage: 15,
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
