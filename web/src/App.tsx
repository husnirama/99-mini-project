import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import GuestRoute from "./routes/GuestRoute";
import RegisterPage from "./pages/RegisterPage";
import OrganizerRoute from "./routes/OrganizerRoute";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetail from "./pages/EventDetail";
import OrderStep1Page from "./pages/OrderStep1Page";
import PaymentDetailPage from "./pages/PaymentDetailPage";
import CustomerTransactionsPage from "./pages/CustomerTransactionsPage";
import OrganizerTransactionsPage from "./pages/OrganizerTransactionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={ }></Route> */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/events/:id" element={<EventDetail />}></Route>
          <Route path="/events/:id/checkout" element={<OrderStep1Page />}></Route>
          <Route
            path="/transactions/history"
            element={<CustomerTransactionsPage />}
          ></Route>
          <Route
            path="/transactions/:transactionId"
            element={<PaymentDetailPage />}
          ></Route>
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/auth/login" element={<LoginPage />}></Route>
          <Route path="/auth/register" element={<RegisterPage />}></Route>
        </Route>
        <Route element={<OrganizerRoute />}>
          <Route path="/organizer/create-event" element={<CreateEventPage />} />
          <Route
            path="/organizer/transactions"
            element={<OrganizerTransactionsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
