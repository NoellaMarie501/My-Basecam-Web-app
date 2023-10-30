import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routers from "./routes/router";
import Header from "./header";
import { getLoggedInUser } from "./utils/getLoggedInUser";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  // const loggedin = getLoggedInUser();

  // console.log(loggedin)
  return (
    <>
      {/* {loggedin && <Header />} */}

      <div className="App">
          <Router>
        <DashboardLayout>
            <Routers />
        </DashboardLayout>
          </Router>
      </div>
    </>
  );
}

export default App;
