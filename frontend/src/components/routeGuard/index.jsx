import { Navigate, useLocation } from "react-router-dom"


function RouteGuard({authenticated, user, element}) {
    const location = useLocation();
    //Case1 -> If user in not authenticated and try to access any pages other than auth pages
    if( !authenticated && !location.pathname.includes('/auth')){
        return <Navigate to='/auth' />
    }
    //Case2 -> If user is already authenticated and its role is not admin or instructor or they try to access /instructor pages or try to access /auth pages(as user is already authenticated, therefore no need to access /auth again)
    if( authenticated && user?.role !== 'instructor' && (location.pathname.includes('instructor') || location.pathname.includes('auth'))){
        return <Navigate to={'/home'}/>
    }
    //Case3 -> if authenticated user is 'instructor' and they try to access route other than instructor.
    if(authenticated && user?.role === 'instructor' && !location.pathname.includes('instructor')){
        return <Navigate to={'/instructor'}/>
    }
  return (
    <>{element}</>
  )
}

export default RouteGuard