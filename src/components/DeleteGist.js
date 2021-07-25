import React from "react";
import GitHubWrapper from "./githubWrapper";

const DeleteGist = ({
	id,
	allGists,
	setAllGists,
	filteredGists,
	setFilteredGists,
}) => {
	const wrapper = new GitHubWrapper();

	const handleDeleteGist = () => {
		const index = allGists.findIndex((gist) => gist.id === id);
		let newAllGists = allGists.filter((gist, idx) => idx !== index);
		let newFilteredGists = filteredGists.filter((gist, idx) => idx !== index);
		setAllGists(newAllGists);
		setFilteredGists(newFilteredGists);

		wrapper.deleteGist(id);
	};

	return (
		<button
			onClick={() => {
				handleDeleteGist();
			}}
		>
			Delete
		</button>
	);
};

export default DeleteGist;
