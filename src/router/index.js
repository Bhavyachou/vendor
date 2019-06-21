import Vue from 'vue'
import Router from 'vue-router'
import VendorOnboard from '@/components/VendorOnboard'
import PlanOnboard from '@/components/PlanOnboard'
import PlanMap from '@/components/PlanMap'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: 'VendorOnboard'
            }
        },
        {
            path: "/vendoronboard",
            name: 'VendorOnboard',
            props: true,
            component: VendorOnboard
        },
        {
            path: "/planonboard",
            name: 'PlanOnboard',
            props: true,
            component: PlanOnboard
        },
        {
            path: "/planmap",
            name: 'PlanMap',
            props: true,
            component: PlanMap
        },
    ]
})