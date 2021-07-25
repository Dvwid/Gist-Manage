import "./App.css";
import CreateGists from "./components/CreateGists";
import ShowAllGists from "./components/ShowAllGists";

function App() {
	return (
		<div className="App">
			<CreateGists />
			<ShowAllGists />
		</div>
	);
}

export default App;
