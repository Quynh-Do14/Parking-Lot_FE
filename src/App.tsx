import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes } from './infrastructure/routes';
import { PrivateRoute } from './infrastructure/routes/private-router';
import authService from './infrastructure/repositories/auth/service/auth.service';
import { useRecoilState } from 'recoil';
import { ProfileState } from './core/atoms/profile/profileState';
import { useEffect } from 'react';

function App() {
  const [, setProfileState] = useRecoilState(ProfileState);
  const getProfileUser = async () => {
    try {
      await authService.profile(
        () => { }
      ).then((response) => {
        if (response) {
          setProfileState(
            {
              user: response?.customer?.user,
              contactNumber: response?.customer?.contactNumber,
              vehicleNumber: response?.customer?.vehicleNumber,
              regularPass: response?.regularPass,
            }
          )
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProfileUser().then(() => { })
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {privateRoutes.map((page, index) => {
            if (page.private) {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <PrivateRoute component={<page.component />} />
                  } />
              )
            }
            else {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <page.component />
                  } />
              )
            }
          })}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
