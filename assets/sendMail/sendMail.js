// import { useStore } from '@nuxtjs/composition-api';
import { Email } from './smtp.js';
// console.log('Email: ', Email);

export async function SendMail(data) {
  const { name, phone, title } = data;

  if (!name || !phone) {
    return new Error('не удалось отправить форму');
  }

  //* google
  const response = await Email.send({
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
      title ?? 'не удалось узнать тему'
    }`,
  });

  return response;
}

export async function SendQuiz({ data, name, contact }) {
  console.log({ data, name, contact });
  if (!name || !data || !contact) {
    return new Error('не удалось отправить форму');
  }
  console.log('data: ', data);

  const str = Object.entries(data)
    .map(([question, answer]) => {
      return `
      <ol style="padding: 10px; margin-top: 8px;"><b>${question}</b>: ${answer}</ol>
    `;
    })
    .join('');

  //* google
  const response = await Email.send({
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
  });

  return response;
}
