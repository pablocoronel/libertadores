const storyValidation = () => {
	const title = document.getElementsByName('title')[0];
	const cover = document.getElementsByName('cover')[0];
	const content = document.getElementsByName('content')[0];
	const messageError = document.getElementById('errorMessage');
	const result = false;

	const fieldsNotAreEmpty = [title, cover, content].every(
		(item) => item.value != ''
	);

	if (fieldsNotAreEmpty) {
		result = true;
	} else {
		messageError.classList.replace('d-none', 'd-block');
	}

	return result;
};
