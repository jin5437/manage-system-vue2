import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes:[
    {
      path:'/',
      redirect:'/Main'
    },
    {
      name:'Main',
      path:'/Main',
      component:() => import('../views/Main'),
      meta:{title:'首页'}
    },
    {
      name:'UserMana',
      path:'/UserMana',
      component:() => import('../views/UserMana'),
      meta:{title:'用户管理'}
    },
    {
      name:'RoleMana',
      path:'/RoleMana',
      component:() => import('../views/RoleMana'),
      meta:{title:'角色管理'},
      children:[
        {
          name:'RoleAuthorize',
          path:'/RoleMana/RoleAuthorize',
          component:() => import('../views/RoleAuthorize'),
          meta:{title:'角色授权'},
        }
      ]
    },
    {
      name:'MenuMana',
      path:'/MenuMana',
      component:() => import('../views/MenuMana'),
      meta:{title:'菜单管理'}
    },
  ]
})

export default router
