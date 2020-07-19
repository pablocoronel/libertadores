/**
 *
 * @param {String} error - id del div que muestra los mensajes de error
 * @param  {String[]} fields - atributo name de los inputs a validar
 * @returns boolean
 */
const storyValidation = (error, ...fields) => {
	const result = false;
	const inputs = [];
	const messageError = document.getElementById(error);

	fields.forEach((item) => {
		inputs.push(document.getElementsByName(item)[0]);
	});

	const fieldsNotAreEmpty = inputs.every((item) => item.value != '');

	if (fieldsNotAreEmpty) {
		result = true;
	} else {
		messageError.classList.replace('d-none', 'd-block');
	}

	return result;
};
