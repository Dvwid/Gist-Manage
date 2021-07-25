import React, { useState } from "react";

const FilterGistsButton = ({ allGists, setIsFiltered, setFilteredGists }) => {
	const [isFilteredBy, setIsFilteredBy] = useState(null);
	const expectedExtension = "json";

	const filterByExt = allGists.filter((gist, index) => {
		const gistFiles = Object.keys(allGists[index].files);
		let re = /(?:\.([^.]+))?$/;
		const extension = re.exec(gistFiles);

		if (expectedExtension.includes(extension[1])) {
			return gist;
		} else return null;
	});

	return (
		<button
			onClick={() => {
				setIsFiltered(true);
				setFilteredGists(filterByExt);
			}}
		>
			FilterByExt
		</button>
	);
};

export default FilterGistsButton;
