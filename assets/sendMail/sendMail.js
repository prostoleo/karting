// import { useStore } from '@nuxtjs/composition-api';
// import { Email } from './smtp.js';
// console.log('Email: ', Email);

export async function SendMail(data) {
  const { name, phone } = data;

  if (!name || !phone) {
    return new Error('не удалось отправить форму');
  }

  //* google
  /* const response = await Email.send({
    Host: 'smtp.google.com',
    // Host: 'smtp.fgsgsg.com',
    Username: 'prostoleo.dev@gmail.com', // google
    Password: 'ughfxwkqflveychr', // google
    // Username: 'zz@gmail.com', // google
    // Password: '123', // google
    To: 'prostoleo.dev@gmail.com',
    From: 'prostoleo.dev@gmail.com',
    Subject: `${name} отправил Вам сообщение`,
    Body: `Имя: ${name} <br /> Телефон: ${phone} <br /> Тема: ${
      subject ?? 'не удалось узнать тему'
    }`, 

    
  }); */

  const dataToSubmit = {
    name: name.trim(),
    email: `не указан`,
    phone: phone.trim(),
    subject: `Заявка с сайта forzakarting - картинг Краснодар`,
    fromWebsite: window.location.href,
    // title,
  };

  const response = await fetch(
    `https://functions.yandexcloud.net/d4ektmdocmfsls83f9r4`,
    {
      method: 'POST',
      headers: {
        Accept: '/',
        // 'Content-type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'Content-Type': 'application/json',
        'Content-Type': 'text/plain',
      },
      // body: dataToSubmit,
      body: JSON.stringify(dataToSubmit),
    }
  );

  return response;
}

export async function SendQuiz({ data, name, contact }) {
  // console.log({ data, name, contact });
  if (!name || !data || !contact) {
    return new Error('не удалось отправить форму');
  }
  // console.log('data: ', data);

  /* const str = Object.entries(data)
    .map(([question, answer]) => {
      return `
      <ol style="padding: 10px; margin-top: 8px;"><b>${question}</b>: ${answer}</ol>
    `;
    })
    .join(''); */

  //* google
  /* const response = await Email.send({
    Host: 'smtp.google.com',
    // Host: 'smtp.fgsgsg.com',
    Username: 'prostoleo.dev@gmail.com', // google
    Password: 'ughfxwkqflveychr', // google
    // Username: 'zz@gmail.com', // google
    // Password: '123', // google
    To: 'prostoleo.dev@gmail.com',
    From: 'prostoleo.dev@gmail.com',
    Subject: `${name} отправил Вам сообщение`,
    Body: `Имя: ${name} <br /> Контакт: ${contact} <br /><br /> 
      <ul style="margin-top: 20px; padding-left: 15px;">${str}</ul>
    `,
  }); */
  const dataToSubmit = {
    name: name.trim(),
    contact: contact.trim(),
    data,
    subject: `Заявка с квиза сайта forzakarting`,
    fromWebsite: window.location.href,
    // title,
  };

  const response = await fetch(
    `https://functions.yandexcloud.net/d4em2db6rbppd85d8d2a`,
    {
      method: 'POST',
      headers: {
        Accept: '/',
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(dataToSubmit),
    }
  );

  return response;
}
