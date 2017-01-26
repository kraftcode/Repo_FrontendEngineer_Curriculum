import './main.css';
import demoImage2 from '../assets/images/demo2.jpg';
import component from './component';

var img = document.createElement('img');
img.src = demoImage2;

document.body.appendChild(component());
document.body.appendChild(img);
