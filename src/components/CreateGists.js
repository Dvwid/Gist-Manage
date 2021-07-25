import React, { useState } from "react";
import GitHubWrapper from "./githubWrapper";

const CreateGists = () => {
	const [fileName, setFileName] = useState("");
	const [description, setDescription] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [content, setContent] = useState("");

	const strigifyToJSON = () => {
		const json = {
			description,
			public: isPublic,
			files: {
				[fileName]: { content },
			},
		};
		return JSON.stringify(json);
	};

	const handleSubmit = () => {
		const wrapper = new GitHubWrapper();
		wrapper.createGist(strigifyToJSON()).then((res) => {
			console.log(res);
		});
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				console.log(fileName, description, content, isPublic);
				handleSubmit();
			}}
		>
			<label>
				FileName:
				<input
					type="text"
					name="fileName"
					value={fileName}
					onChange={(e) => {
						setFileName(e.target.value);
					}}
				/>
			</label>
			<label>
				Description:
				<input
					type="text"
					name="description"
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</label>
			<label>
				Content:
				<input
					type="text"
					name="Content"
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				/>
			</label>
			<div>
				<input
					type="checkbox"
					name="isPublic"
					value={isPublic}
					onChange={() => {
						setIsPublic(!isPublic);
					}}
				/>
				<label>Public?</label>
			</div>

			<button type="submit">Create</button>
		</form>
	);
};

export default CreateGists;
