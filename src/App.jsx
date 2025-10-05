import { useLocation, useRoutes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import { useCheckLogin } from './hooks/useCheckLogin';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';
import routeList from './utils/routers';

// ⬇️ import Splash
import SplashScreen from '@/app/Splash/SplashScreen';
import { useEffect, useState } from 'react';
import { BottomTab } from './components/BottomTab';
import PageTransitionWrapper from './app/PageTransitionWrapper';
import { setTabBottom } from './store/appSlice';
import routes from './utils/routes';
const pathNotabBottom=[
  routes.Garage,routes.LeaderBoard,routes.Box,
]
function App() {
  // trạng thái splash: hiện splash khi mở app
  const [showSplash, setShowSplash] = useState(true);
  const location=useLocation();
  const dispatch=useDispatch();
  // auth
  const loading = useCheckLogin();
  const isAuthenticated = useSelector((state) => state.app.isLoggedIn);

  // ⚠️ Sửa tham số cho đúng, dùng param isAuthenticated (không dùng biến ngoài)
  function convertRoutes(routes, isAuthenticatedParam) {
    return routes.map((route) => {
      const Component = route.element;
      let element = <Component {...(route.props || {})} />;

      if (route.requireAuth) {
        element = (
          <PrivateRoute isAuthenticated={isAuthenticatedParam}>
            {element}
          </PrivateRoute>
        );
      }

      return {
        path: route.path,
        index: route.index,
        element,
        children: route.routers ? convertRoutes(route.routers, isAuthenticatedParam) : undefined,
      };
    });
  }
useEffect(() => {
 
  dispatch(setTabBottom(location?.pathname))
  return () => {
    
  };
}, [location]);
  // 👉 Hiển thị Splash trước, khi xong mới render app
  if (showSplash) {
    return (
      <SplashScreen
        // để chắc chắn gọi onDone, ta cho autoClose=false
        autoClose={false}
        onDone={() => setShowSplash(false)}
      // bạn có thể tuỳ tốc độ/target nếu muốn:
      // initial={0}
      // target={100}
      // speed={35}
      />
    );
  }

  // Khi đang kiểm tra đăng nhập, có thể hiện loading (tuỳ bạn)
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const elements = useRoutes(convertRoutes(routeList, isAuthenticated));

  return (
    <div className="w-full h-screen max-w-[414px] m-auto  lg:border lg:rounded-md lg:h-[800px] lg:mt-10 relative ">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <PageTransitionWrapper mode={location.pathname==routes.Box?"zoom":"slide"}>
        {elements}
      </PageTransitionWrapper>
     {!pathNotabBottom.includes(location.pathname) && <BottomTab />} 
    </div>
  );
}

export default App;
