import { Route, Link } from "react-router-dom";
import Users from "./Home/usersInfo";
import Home from "./home";

function Router() {
  return (
    <div>
      <div class="centeredBack">
        <div>
        </div>
        <div className="centered">
          {/* <Route exact path="/" component={Home} />           */}
          <Route exact path="/" component={Users} />          
        </div>
      </div>
    </div>
  );
}
export default Router;
