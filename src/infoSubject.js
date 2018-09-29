const { JSDOM } = require('jsdom');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const url = 'https://siabog.unal.edu.co/academia/apoyo-administrativo/ConsultaContenidos.do?action=Info&idAsignatura=2016068';

JSDOM.fromURL(url).then((dom) => {
  const zonaDatos = dom.window.document.querySelectorAll('.zona-dato-caja > .zona-dato-caja > h3');

  zonaDatos.forEach((zona) => {
    console.log(zona.textContent);
  });


}).catch(err => console.log('ERROR', err));
