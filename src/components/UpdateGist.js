import React, { useState } from "react";
import GitHubWrapper from "./githubWrapper";
import "./styles/UpdateGist/updateGist.scss";
import { ReactComponent as LeftArrow } from "../icons/left-arrow.svg";
import UpdateGistPopup from "./UpdateGistPopup";

const AllGistsEditGist = ({
	editingFile,
	editingContent,
	editingFilename,
	setFileIsEditing,
	setAllGists,
	setFilteredGists,
}) => {
	const [fileName, setFileName] = useState(`${editingFilename}`);
	const [content, setContent] = useState(editingContent);
	const [id, setId] = useState(editingFile[0].id);

	const [popupType, setPopupType] = useState("");
	const [popupIsActive, setPopupIsActive] = useState(false);
	const [popupText, setPopupText] = useState("");

	const strigifyToJSON = () => {
		const json = {
			files: {
				[fileName]: { content },
			},
		};
		return JSON.stringify(json);
	};

	const handleSubmit = async () => {
		const wrapper = new GitHubWrapper();
		if (content === "") {
			setPopupType("error");
			setPopupText("Content can't be empty.");
			setPopupIsActive(true);
		} else {
			await wrapper
				.updateGist(id, strigifyToJSON())
				.then((res) => {
					setPopupType("correct");
					setPopupText("Success! The file has been updated");
					setPopupIsActive(true);
				})
				.catch((err) => {
					console.log(setId);
				});
			await setAllGists([]);
			await setFilteredGists([]);
		}
	};

	return popupIsActive ? (
		<UpdateGistPopup
			setPopupIsActive={setPopupIsActive}
			setPopupText={setPopupText}
			popupType={popupType}
			popupText={popupText}
			setFileIsEditing={setFileIsEditing}
		/>
	) : (
		<div className="updateGist">
			<div className="updateGist_header">
				<button
					onClick={() => {
						setFileIsEditing(false);
					}}
				>
					<LeftArrow className="updateGist_header_leftArrow" />
				</button>

				<div>
					Update <span className="updateGist_header_title">Gist</span> file
				</div>
				<div></div>
			</div>
			<form
				className="updateGist_form"
				onSubmit={(e) => {
					e.preventDefault();
					console.log(fileName, content);
					handleSubmit();
				}}
			>
				<input
					type="text"
					name="fileName"
					value={fileName ? fileName : "XD"}
					onChange={(e) => {
						setFileName(e.target.value);
					}}
					placeholder="Filename including extension"
					className="updateGist_form_input"
					readOnly
				/>

				<textarea
					type="text"
					name="Content"
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
					className="updateGist_form_textarea"
				/>
				<div className="updateGist_form_buttons">
					<button className="updateGist_form_buttons_button" type="submit">
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default AllGistsEditGist;
