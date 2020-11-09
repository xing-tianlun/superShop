<template>
  <div id="category">
    <!-- 分类标题栏 -->
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <!-- 分类内容主体 -->
    <div class="content">
      <!-- 分类侧边栏 -->
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <!-- 分类主要内容 -->
      <scroll id="tab-content" ref='scroll'>
        <div>
          <!-- 详细分类 -->
          <tab-content-category :subcategories="showSubcategory"/>
          <!-- 详细分栏 -->
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
          <!-- 详细分栏商品 -->
          <tab-content-detail :category-detail="showCategoryDetail"/>
        </div>
      </scroll>
    </div>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'

  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
  import { tabControlMixin, itemListenerMixin } from 'common/mixin'
  export default {
    name: "Category",
    data() {
      return {
        categories: [],
        categoryData: {
        },
        currentIndex: -1
      }
    },
    components: {
      NavBar,
      Scroll,
      TabControl,

      TabMenu,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [tabControlMixin, itemListenerMixin],
    created() {
      // 1.请求分类数据
      this.getCategory()
    },
    computed: {
      showSubcategory() {
        if(this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if(this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      // 网络请求相关的方法
      getCategory() {
        getCategory().then(res => {
          
          this.categories = res.data.category.list
          console.log(this.categories);
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          this.getSubcategories(0)
        })
      },
      getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          
          this.getCategoryDetail('pop')
          this.getCategoryDetail('sell')
          this.getCategoryDetail('new')
        })

      },
      getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },

      selectItem(index) {
        console.log(index);
        console.log(this.categoryData[this.currentIndex].categoryDetail['pop']); 
        this.getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>
