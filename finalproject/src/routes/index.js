import LayoutDefault from "../components/layout/layoutDefault";
import Admin from "../components/layout/admin";
import Home from '../pages/home';
import Login from '../pages/login';
import Logout from '../pages/logout';
import Register from '../pages/register';
import OverView from "../pages/overView";
import CompanyInfo from "../pages/companyInfo";
import CVManager from "../pages/cvManager";
import JobsManager from "../pages/jobsManager";
import CreateJob from "../pages/jobsManager/createJob";
import PreviewObj from "../pages/jobsManager/previewObj";
import PreviewCV from "../pages/cvManager/previewCV";
import CompanyList from "../pages/companyList";
import CompanyDetail from "../pages/companyDetail";
import ApplyForm from "../pages/applyForm";
import Search from "../pages/search";

export const routes = [
    {
        path: '/',
        element: <LayoutDefault/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "logout",
                element: <Logout/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "companyList",
                element: <CompanyList/>
            }, 
            {
                path: "companyDetail/:id",
                element: <CompanyDetail/>
            },
            {
                path: "applyForm/:id",
                element: <ApplyForm/>
            },
            {
                path: "search",
                element: <Search/>
            }
           
        ],
    },
    {
        path: "/admin",
        element: <Admin/>,
        children: [
            {
                index: true,
                element: <OverView/>
            },
            {
                path: "/admin/companyInfo",
                element: <CompanyInfo/>
            },
            {
                path: "/admin/jobsManager",
                element: <JobsManager/>
            },
            {
                path: "/admin/cvManager",
                element: <CVManager/>
            },
            {
                path: "/admin/createJob",
                element: <CreateJob/>
            },
            {
                path: "/admin/previewObj/:id",
                element: <PreviewObj/>
            },
            {
                path: "/admin/previewCV/:id",
                element: <PreviewCV/>
            },
        ],
    }
]