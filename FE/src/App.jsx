import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <>
      <ScrollRestoration />

      {/* <NavBar /> */}

      <Outlet />

      {/* <Footer /> */}
    </>
  );
}

export default App;
