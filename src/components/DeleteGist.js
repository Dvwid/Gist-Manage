import React from "react";
import GitHubWrapper from "./githubWrapper";

const DeleteGist = ({ id, allGists, setAllGists }) => {
	const wrapper = new GitHubWrapper();

	const handleDeleteGist = () => {
		const index = allGists.findIndex((gist) => gist.id === id);
		let newArray = allGists.filter((gist, idx) => idx !== index);
		setAllGists(newArray);
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
