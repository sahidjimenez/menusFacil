import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from "./pages/home";
import ProductsDetails from "./pages/details";
import Category from "./pages/category"
import Header from "./components/header/header";
import Order from './pages/order/order';
import Footer from './components/Footer/footer';
import NoFound from './components/NoFound/noFound';
import Nosotros from './pages/nosotros/nosotros';
import Sucursales from './pages/sucursales/sucursales';
import Contactanos from './pages/contactanos/contactanos';
import OrderPizza from './pages/orderPizza/order';
import OrderDinosPizza from './pages/orderDinosPizza/orderDinosPizza';
import ThePizzaSpot from './pages/thePizzaSpot/thePizzaSpot';
import ReactGA from 'react-ga4'


const TRACKING_ID = "G-CDSY2E4QCG"
ReactGA.initialize(TRACKING_ID)
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname
})
function App() {

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route exact path="/" element={<NoFound />} />

          {/* 
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/details/:id" element={<ProductsDetails />} />
          <Route exact path="/category/:id" element={<Category />} />
          <Route exact path="/order" element={<Order />} />
          <Route exact path="/nosotros" element={<Nosotros />} />
          <Route exact path="/sucursales" element={<Sucursales />} />
          <Route exact path="/contactanos" element={<Contactanos />} />
          <Route exact path="/OrdenarPizza" element={<OrderPizza />} />
          <Route exact path="/DinosPizza" element={<OrderDinosPizza />} /> */}
          <Route exact path="/thepizzaspot" element={<ThePizzaSpot />} />
          <Route exact path="*" element={<NoFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
