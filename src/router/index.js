

 import Vue from "vue";
 import Router from "vue-router";
 const route = new Router({
   mode: "hash",
   base: process.env.BASE_URL,
   routes: [
    {
        path:"/",
        name:"home",
        // component: () => import("@/views/partner/partnerList.vue"),
        component:()=>import('@/view/home.vue')
    },
    {
      path:"/zformDesignersView",
      name:"zformDesignersView",
      // component: () => import("@/views/partner/partnerList.vue"),
      component:()=>import('@/view/zformDesignersView.vue')
    }
   ],
 });

 Vue.use(Router);
 export default route;
 