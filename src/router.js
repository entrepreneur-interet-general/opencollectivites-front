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
            path: "/a-venir",
            name: "NotYet",
            component: () => import("./components/pages/PageNotYet.vue")
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
