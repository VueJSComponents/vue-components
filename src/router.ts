import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import ContentWindow from '@/components/ContentWindow.vue';
import ViewPackageMeta from './components/ViewPackageMeta.vue';
import PackageReadme from './components/PackageReadme.vue';
import PackageDocs from './components/PackageDocs.vue';
import PackagePlayground from './components/PackagePlayground.vue';
import PackageUnselected from './components/PackageUnselected.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'notselected',
      component: PackageUnselected
    },
    {
      path: '/package/:id/meta',
      name: 'packageMeta',
      component: ViewPackageMeta
    },
    { path: '/package/:id/readme', name: 'packageReadme', component: PackageReadme },
    { path: '/package/:id/docs', name: 'packageDocs', component: PackageDocs },
    {
      path: '/package/:id/playground',
      name: 'packagePlayground',
      component: PackagePlayground
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
