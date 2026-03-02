import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import GuestRoute from "./routes/GuestRoute";
import RegisterPage from "./pages/RegisterPage";
import OrganizerRoute from "./routes/OrganizerRoute";
import CreateEventPage from "./pages/CreateEventPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={ }></Route> */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/auth/login" element={<LoginPage />}></Route>
          <Route path="/auth/register" element={<RegisterPage />}></Route>
        </Route>
        <Route element={<OrganizerRoute />}>
          <Route path="/organizer/create-event" element={<CreateEventPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
