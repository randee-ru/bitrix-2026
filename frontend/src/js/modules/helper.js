function hasClass (element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1
}

async function postData(actionUrl, data = {}) {
  try {
    // Создаем объект FormData
    const formData = new FormData();

    // Заполняем FormData параметрами
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    const response = await fetch(actionUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      // Обрабатываем ошибки HTTP
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}

function getFieldsFromForm(form) {
  const formData = {};

  // Получаем все элементы формы
  const elements = form.elements;

  // Проходимся по всем элементам формы
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const name = element.name;
    const value = element.value;

    // Проверяем, есть ли у элемента имя, чтобы избежать лишних данных
    if (name) {
      if (element.type === 'checkbox') {
        // Если это чекбокс, добавляем в массив, если отмечен
        if (!formData[name]) {
          formData[name] = [];
        }
        if (element.checked) {
          formData[name].push(value);
        }
      } else if (element.type === 'radio') {
        // Если это радио, добавляем значение только если отмечено
        if (element.checked) {
          formData[name] = value;
        }
      } else {
        // Для всех остальных типов полей просто добавляем значение
        formData[name] = value;
      }
    }
  }

  return formData
}

function redirect(newHost) {
  // Текущая категория и аргументы в адресной строке
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  // Перенаправляем пользователя
  window.location.href = `${newHost}${currentPath}${currentSearch}`;
}

export {hasClass, postData, getFieldsFromForm, redirect}
