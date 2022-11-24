import {Routes, Route} from "react-router-dom";
import {Home} from "./pages/home";
import {BestPrices} from "./pages/best-prices";
import {Login} from "./pages/login";
import {Register} from "./pages/register";
import {Bookings} from "./pages/bookings";
import {Header} from "./components/Header";
import {ProtectedRoute} from "./auth/protected.route";

function App() {
  return (
    <div className={'container-fluid p-0'}>
      <Header />
      <main>
        <Routes>
          <Route path={''} element={<Home />}/>
          <Route path={'best-price'} element={<BestPrices />} />
          <Route path={'login'} element={<Login />}/>
          <Route path={'register'} element={<Register />}/>
          <Route path={'bookings'} element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
