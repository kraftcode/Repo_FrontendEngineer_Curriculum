import './main.css';
import demoImage2 from '../assets/images/demo2.jpg';
import component from './component';

var img = document.createElement('img');
img.src = demoImage2;

let headers = component();

document.body.appendChild(headers.h1);
document.body.appendChild(headers.h2);
document.body.appendChild(img);
