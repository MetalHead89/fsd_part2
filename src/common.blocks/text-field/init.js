import TextField from './TextField';

const maskedTextFields = document.querySelectorAll(
  '.js-text-field__field_masked'
);
maskedTextFields.forEach((item) => new TextField(item));
