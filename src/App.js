import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingSite from "./components/LandingSite";
import AllGists from "./components/AllGists";
import CreateGists from "./components/CreateGists";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact>
						<LandingSite />
					</Route>
					<Route path="/new">
						<CreateGists />
					</Route>
					<Route path="/all">
						<AllGists />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
