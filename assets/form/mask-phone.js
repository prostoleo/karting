export default function foo() {
  Array.from(document.querySelectorAll('.tel')).forEach((input) => {
    function mask(event) {
      const { keyCode } = event;

      const pos = input.selectionStart;

      if (pos < 3) event.preventDefault();

      const matrix = '+7 (___) ___-__-__';
      let i = 0;
      const def = matrix.replace(/\D/g, '');
      const val = input.value.replace(/\D/g, '');
      let newVal = matrix.replace(/[_\d]/g, (a) => {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });

      i = newVal.indexOf('_');

      if (i !== -1) {
        i < 5 && (i = 3);
        newVal = newVal.slice(0, i);
      }
      let reg = matrix
        .substring(0, input.value.length)
        .replace(/_+/g, function (a) {
          return '\\d{1,' + a.length + '}';
        })
        .replace(/[+()]/g, '\\$&');

      reg = new RegExp('^' + reg + '$');

      if (
        !reg.test(input.value) ||
        input.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        input.value = newVal;
      if (event.type === 'blur' && input.value.length < 5) input.value = '';
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);
  });

  /* window.addEventListener('DOMContentLoaded', function () {
    [].forEach.call(document.querySelectorAll('.tel'), function (input) {
      console.log('input: ', input);
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = input.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = '+7 (___) ___-__-__',
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = input.value.replace(/\D/g, ''),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf('_');
        if (i !== -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        var reg = matrix
          .substr(0, input.value.length)
          .replace(/_+/g, function (a) {
            return '\\d{1,' + a.length + '}';
          })
          .replace(/[+()]/g, '\\$&');
        reg = new RegExp('^' + reg + '$');
        if (
          !reg.test(input.value) ||
          input.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          input.value = new_value;
        if (event.type === 'blur' && input.value.length < 5) input.value = '';
      }

      input.addEventListener('input', mask, false);
      input.addEventListener('focus', mask, false);
      input.addEventListener('blur', mask, false);
      input.addEventListener('keydown', mask, false);
    });
  }); */
}
