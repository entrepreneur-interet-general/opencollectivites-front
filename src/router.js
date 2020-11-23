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
            path: "/siren/:siren/:name",
            name: "placeSummary",
            component: () => import("./components/pages/PlaceSummary.vue"),
            props: true
        },
    ]
});
