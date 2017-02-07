import snabbdom from 'snabbdom';
import './main.css';
import demoImage2 from '../assets/images/demo2.jpg';
import component from './component';

let h = require('snabbdom/h').default;

const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
]);

let oldNode = document.getElementById('app');
let newNode = undefined;
let headers = component(); //date strings

function updateView(oldNode) {
  console.log('In updateView...' + headers.h2);
  newNode = h('div', [
    h('h1', {style: {color: 'blue'}}, headers.h1),
    h('h2',
      {
        style: {
          color: 'red',
        },
        props: {
        },
        on: { },
      }, headers.h2),
    h('img', {props: {src: demoImage2}}), // set tag properties with props: object
  ]);
  patch(oldNode, newNode);
  oldNode = newNode;
}

updateView(oldNode);
