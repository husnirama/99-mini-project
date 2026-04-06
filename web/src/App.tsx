import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import GuestRoute from "./routes/GuestRoute";
import RegisterPage from "./pages/RegisterPage";
import OrganizerRoute from "./routes/OrganizerRoute";
import CustomerRoute from "./routes/CustomerRoute";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetail from "./pages/EventDetail";
import OrderStep1Page from "./pages/OrderStep1Page";
import PaymentDetailPage from "./pages/PaymentDetailPage";
import CustomerTransactionsPage from "./pages/CustomerTransactionsPage";
// import CustomerProfilePage from "./pages/Customer/CustomerProfilePage";
// import CustomerCouponsPage from "./pages/Customer/CustomerCouponsPage";
import OrganizerTransactionsPage from "./pages/OrganizerTransactionsPage";
import OrganizerDashboardPage from "./pages/OrganizerProfile/OrganizerDashboardPage";
import OrganizerProfilePage from "./pages/OrganizerProfile/OrganizerProfilePage";
import OrganizerStatisticsPage from "./pages/OrganizerProfile/OrganizerStatisticsPage";
import OrganizerTransactionViewPage from "./pages/OrganizerProfile/OrganizerTransactionViewPage";
import OrganizerAttendeesPage from "./pages/OrganizerProfile/OrganizerAttendeesPage";
import OrganizerSettingPage from "./pages/OrganizerProfile/OrganizerSettingsPage";
import AuthBootstrap from "./components/AuthBootstrap";
import InfoPage from "./pages/InfoPage";
import CustomerTickets from "./pages/CustomerProfile/CustomerTickets";
import CustomerProfilePage from "./pages/CustomerProfile/CustomerProfilePage";
import CustomerReviews from "./pages/CustomerProfile/CustomerReviews";
import CustomerPoints from "./pages/CustomerProfile/CustomerPoints";
import CustomerSettings from "./pages/CustomerProfile/CustomerSettings";
// import { useAuthStore } from "./store/auth-store";
// import type { ReactNode } from "react";

// function CustomerOnly({ children }: { children: ReactNode }) {
//   const { isReady, user } = useAuthStore();

//   if (!isReady) {
//     return null;
//   }

//   if (!user) {
//     return <Navigate replace to="/auth/login" />;
//   }

//   if (user.role !== "CUSTOMER") {
//     return <Navigate replace to="/" />;
//   }

//   return <>{children}</>;
// }

export default function App() {
  return (
    <BrowserRouter>
      <AuthBootstrap>
        <Routes>
          {/* <Route path="/" element={ }></Route> */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/events/:id" element={<EventDetail />}></Route>
            <Route
              path="/events/:id/checkout"
              element={<OrderStep1Page />}
            ></Route>
            <Route
              path="/transactions/history"
              element={<CustomerTransactionsPage />}
            ></Route>
            <Route
              path="/transactions/:transactionId"
              element={<PaymentDetailPage />}
            ></Route>
            <Route path="/about" element={<InfoPage />}></Route>
            <Route path="/pricing" element={<InfoPage />}></Route>
            <Route path="/careers" element={<InfoPage />}></Route>
            <Route path="/help" element={<InfoPage />}></Route>
            <Route path="/privacy" element={<InfoPage />}></Route>
            <Route path="/terms" element={<InfoPage />}></Route>
            <Route path="/host" element={<InfoPage />}></Route>
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="/auth/login" element={<LoginPage />}></Route>
            <Route path="/auth/register" element={<RegisterPage />}></Route>
          </Route>
          <Route element={<CustomerRoute />}>
            <Route path="/customer/dashboard" element={<CustomerTickets />} />
            <Route path="/customer/profile" element={<CustomerProfilePage />} />
            <Route path="/customer/reviews" element={<CustomerReviews />} />
            <Route path="/customer/points" element={<CustomerPoints />} />
            <Route path="/customer/settings" element={<CustomerSettings />} />
          </Route>
          <Route element={<OrganizerRoute />}>
            <Route
              path="/organizer/dashboard"
              element={<OrganizerDashboardPage />}
            />
            <Route
              path="/organizer/:id/profile"
              element={<OrganizerProfilePage />}
            />
            <Route
              path="/organizer/:id/statistics"
              element={<OrganizerStatisticsPage />}
            />
            <Route
              path="/organizer/:id/transactions"
              element={<OrganizerTransactionViewPage />}
            />
            <Route
              path="/organizer/:id/attendees"
              element={<OrganizerAttendeesPage />}
            />
            <Route
              path="/organizer/:id/settings"
              element={<OrganizerSettingPage />}
            />
            <Route
              path="/organizer/create-event"
              element={<CreateEventPage />}
            />
            <Route
              path="/organizer/events/:eventId/edit"
              element={<CreateEventPage />}
            />
            <Route
              path="/organizer/transactions"
              element={<OrganizerTransactionsPage />}
            />
          </Route>
        </Routes>
      </AuthBootstrap>
    </BrowserRouter>
  );
}
