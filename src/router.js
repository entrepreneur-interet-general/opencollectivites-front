import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/homepage",
            name: "homepage",
            component: () => import("./components/pages/Homepage.vue")
        },
        {
            path: "/publications",
            name: "publications",
            component: () => import("./components/pages/PagePublications.vue")
        },
        {
            path: "/:type/:siren/:name?",
            name: "placeSummary",
            component: () => import("./components/pages/PlaceSummary.vue"),
            props: true
        },
        {
            path: "/compare/:type/:siren1/:siren2?/:siren3?/:siren4?",
            name: "collectivityComparator",
            component: () => import("./components/pages/CollectivityComparator.vue"),
            props: true
        },
        {
            path: "/mentions-legales",
            name: "LegalNotice",
            component: () => import("./components/pages/PageLegalNotice.vue")
        },
        {
            path: "/a-venir",
            name: "NotYet",
            component: () => import("./components/pages/PageNotYet.vue")
        },
        {
            path: "/homepage-future",
            name: "HomepageFuture",
            component: () => import("./components/pages/HomepageFuture.vue")
        },
        {
            path: "/test",
            name: "Test",
            component: () => import("./components/pages/PageTest.vue")
        },
        {
            path: "/erreur",
            name: "error",
            component: () => import("./components/pages/PageError.vue")
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => import("./components/pages/PageNotFound.vue")
        }

    ]
});
