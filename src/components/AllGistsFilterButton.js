import React from "react";

const AllGistsFilterButton = ({
	allGists,
	setIsFiltered,
	setFilteredGists,
	searchedFilename,
	isFilteredBy,
}) => {
	const searchAndFilter = allGists.filter((gist, index) => {
		const gistFiles = Object.keys(allGists[index].files);
		if (gistFiles[0].toLowerCase().includes(searchedFilename.toLowerCase()))
			return gist;
		return null;
	});

	const filterGist = searchAndFilter.sort((a, b) => {
		switch (isFilteredBy) {
			case "recentlyCreated":
				if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
					return 1;
				} else {
					return -1;
				}
			case "latestCreated":
				if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
					return -1;
				} else {
					return 1;
				}
			case "recentlyUpdated":
				if (Date.parse(a.updated_at) < Date.parse(b.updated_at)) {
					return 1;
				} else {
					return -1;
				}
			case "latestUpdated":
				if (Date.parse(a.updated_at) < Date.parse(b.updated_at)) {
					return -1;
				} else {
					return 1;
				}
			default:
				return null;
		}
	});

	return (
		<>
			<button
				onClick={() => {
					setIsFiltered(true);
					setFilteredGists(filterGist);
					if (searchedFilename) setFilteredGists(searchAndFilter);
				}}
			>
				Set filters
			</button>
			<button
				onClick={() => {
					setIsFiltered(false);

					setFilteredGists(allGists);
				}}
			>
				Delete all filters
			</button>
		</>
	);
};

export default AllGistsFilterButton;
