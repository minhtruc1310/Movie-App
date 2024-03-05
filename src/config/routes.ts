import IRoute from "../interfaces/route";
import Home from "../pages/home/home";


const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home Page',
    },
    // {
    //     path: '/posts/:id',
    //     exact: true,
    //     component: Post,
    //     name: 'Post',
    // }
];

export default routes;