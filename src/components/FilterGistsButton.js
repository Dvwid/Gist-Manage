import React, { useState } from "react";

const FilterGistsButton = ({
	allGists,
	setIsFiltered,
	setFilteredGists,
	searchedFilename,
	setSearchedFilename,
}) => {
	const [isFilteredBy, setIsFilteredBy] = useState("name");
	const expectedExtension = "py";

	const filterGists = allGists.filter((gist, index) => {
		const gistFiles = Object.keys(allGists[index].files);
		let re = /(?:\.([^.]+))?$/;
		const extension = re.exec(gistFiles);
		switch (isFilteredBy) {
			case "ext":
				if (expectedExtension.includes(extension[1])) return gist;
				break;
			case "name":
				if (gistFiles[0].toLowerCase().includes(searchedFilename.toLowerCase()))
					return gist;
				break;
			case "extAndName":
				if (
					gistFiles[0].toLowerCase().includes(searchedFilename.toLowerCase()) &&
					expectedExtension.includes(extension[1])
				)
					return gist;
				break;
			default:
				return null;
		}
	});

	return (
		<button
			onClick={() => {
				setIsFiltered(true);
				setFilteredGists(filterGists);
			}}
		>
			FilterByExt
		</button>
	);
};

export default FilterGistsButton;
