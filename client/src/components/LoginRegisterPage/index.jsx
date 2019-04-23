import React from 'react';
import './style.css';
import LoginComponent from '../Login';
import RegisterComponent from '../Register';
import NavbarLoging from '../NavbarLogin';
import './canvas.js';
import './styleCanvas.css';
import {canvas} from './canvas.js';


class LoginRegisterPage extends React.Component{
    

    componentDidMount() {
        sessionStorage.removeItem('token');
        canvas();
        window.scrollTo(0, 0);
    };

    render(){


        return (
        <div >

            {/* Navbar for login comp*/}
            <NavbarLoging/>

            <div className="row d-flex justify-content-center">
                <div className="col-sm-12 ">
                    <canvas id="canvas"></canvas>
                    <h1 className="title">Tell The Story</h1>
                    <h3 className="subTitle">Ayúdanos a contar su historia...</h3>
                </div>
            </div>
            {/* About - Info*/}
            <div className="hr" id="about"></div>
            <div className="row d-flex justify-content-center">
                <div className="col-sm-4 size draw"></div>
                <div className="col-sm-4 size " >
                    <h1>Tell the Story</h1>
                    <p className=" fontInfo2">Tell the Story es un proyecto social que persigue dos objetivos principales:</p>
                    <ul>
                        <li><p className="leftInfo fontInfo2">Fomentar la creatividad mediante el trabajo en equipo a partir de la creación de historias de forma colaborativa.</p></li>
                        <li><p className="leftInfo fontInfo2">Ayudar a mejorar, mediante donaciones, las instalaciones de aquellos niños que, por desgracia, han de pasar un tiempo en las plantas de oncología de los hospitales.</p></li>
                    </ul>
                    <p className="leftInfo fontInfo2">En Tell the Story podrás dar rienda suelta a todas aquellas historias que se te ocurran. </p>
                    <p className="leftInfo fontInfo2">Crea una historia, publícala y realiza una donación, no existe un mínimo, cualquier ayuda es bien recibida *. </p>
                    <p className=" fontInfo2">Colabora en los relatos de otros miembros y ayúdales con tus ideas.</p>
                    <p className=" fontInfo2">Deja que otros aporten un punto de vista diferente a tu relato.</p>
                    <p className=" fontInfo2">¡Sorpréndete con los giros que toman las historias!</p>
                    <p className="leftInfo fontInfo2">Pero, sobre todo, siéntete partícipe de este proyecto social y ayúdanos a que otros puedan contar su historia.</p>
                    <p className="leftInfo fontInfoExtra">* El importe íntegro irá destinado a mejorar las instalaciones de hospitales con plantas de oncología infantil. Las donaciones son voluntarias y se realizarán de forma totalmente segura mendiante Stripe. </p>
                </div>  
            </div>
            <div className="hr" id="why"></div>
            <div className="row d-flex justify-content-center" >
                <div className="col-sm-4 size " >
                    <h1>Motivación</h1>
                    <p className="fontInfo">¿Pasas mucho tiempo escribiendo o leyendo en redes sociales?</p>
                    <p className=" fontInfo">¿Disfrutas escribiendo en tus tablones pequeñas frases o historias?</p>
                    <p className=" fontInfo">¿Y si probamos algo diferente?</p>
                    <p className="leftInfo fontInfo">Todos los días invertimos mucho tiempo en diferentes redes sociales. Escribimos contenido y aportamos a las historias de los demás con nuestros comentarios.</p>
                    <p className="leftInfo fontInfo">Tell the Story busca que ese esfuerzo no caiga en saco roto, busca focalizar esa creatividad conjunta para crear algo entre todos. Que sintamos que estamos creando contenido en comunidad, que podamos ponernos en contacto con personas con nuestra misma imaginación, que nos ayudemos unos a otros. Busca que todos juntos creemos pequeños o grandes relatos, fomentemos nuestra imaginación, trabajemos en equipo, disfrutemos de los demás y podamos sentir que con ello estamos ayudando a aquellos que ahora están pasando por una historia difícil.</p>


                </div>
                <div className="col-sm-2  idea"></div>
                <div className="col-sm-4 size socialMedia">
                </div>  
            </div> 

            {/* Login - Register*/}
            <div className="hr" id="login"></div>
            <div className="row d-flex justify-content-center" >
                <div className="col-sm-4 size login" >
                    <h1>Iniciar sesión</h1>
                    {/* Login Component */}
                    <LoginComponent/>
                </div>
                <div className="col-sm-4 size login" >
                    <h1>¿Aún no tienes cuenta? ¡Regístrate!</h1>
                    {/* Register Component */}
                    <RegisterComponent/>
                </div>
            </div>
                         

        </div>
        );
    }
}


export default LoginRegisterPage;