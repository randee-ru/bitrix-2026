import { getFieldsFromForm, postData } from './helper.js'

/**
 * Использование:
 * <form data-legacy-url="/api/actionName" data-legacy="form">
 */
export const forms = () => {
  const forms = document.querySelectorAll('form[data-legacy="form"]');

  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()

      const actionUrl = form.dataset?.legacyUrl || false
      if (actionUrl === false) {
        return true
      }

      let dataBody = getFieldsFromForm(form)

      postData(actionUrl, dataBody).then(data => {
        let success = data?.success || false
        let errorMessages = data?.errorMessage ?? 'Данные не отправлены'
        let successMessage = data?.successMessage ?? 'Форма успешно заполнена'
        alert(success ? successMessage :  errorMessages)
      })
    })
  })
}
