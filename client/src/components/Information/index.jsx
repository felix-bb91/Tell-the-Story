import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

class Information extends React.Component{

    render(){

        return (
        <div className="infoContainer">

            <h1>Sobre Tell the Story:</h1>

            <div className="row section1Info">
                <div className="col-sm-8 InfoContainer">
                    <img className="elementInfo rounded-circle" src="https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg" />
                    <h3 className="leftInfo">Miembros</h3>
                    <p className="leftInfo fontWeightInfo">Si estás leyendo estas líneas es que ya eres miembro de la comunidad Tell the Story por lo que lo primero: ¡Gracias! Como miembro podrás crear relatos, continuar los de los demás, leer y realizar donaciones. </p>
                    <h3 className="leftInfo">Perfil</h3>
                    <p className="leftInfo fontWeightInfo">En tu perfil privado tendrás acceso directo a tus relatos y a aquellas historias donde has colaborado. Además podrás editar tu imagen, la cual será visible a los demás miembros de la aplicación cuando visiten tu perfil.</p>
                    <h3 className="leftInfo">Baja</h3>
                    <p className="leftInfo fontWeightInfo">Si deseas dejar de ser miembro de Tell the Story, ve a tu perfil, y selecciona la opción: “Eliminar perfil”. Al eliminar tu perfil dejarás de tener acceso a la aplicación, tus datos serán eliminados por completo de la base de datos y tus relatos y aportaciones pasarán a ser anónimos.</p>

                </div>
                <div className="col-sm-2 ">
                </div>

            </div>
            <div className="row">
                <div className="col-sm-1 ">
                </div>
                <div className="col-sm-2 ">
                </div>
                <div className="col-sm-8 InfoContainer">
                    <div className="element2Info rounded-circle" src=""></div>
                    <h3 className="rightInfo">¿Por qué?</h3>
                    <p className="rightInfo fontWeightInfo">La motivación de este proyecto social es recaudar fondos para mejorar la estancia de los niños en plantas de oncología de hospitales. El medio para hacerlo es mediante la escritura colaborativa. Crear historias es, en este caso, la “excusa” para realizar una donación. </p>
                    <h3 className="rightInfo">¿Cuándo donar?</h3>
                    <p className="rightInfo fontWeightInfo">Las donaciones son totalmente voluntarias y la cantidad no está definida. No hay ni un máximo ni un mínimo. Las donaciones, siempre que se pueda, deberán realizarse cada vez que se cree contenido; es decir, un relato, una donación, una sección, una donación.  Podrás crear contenido sin necesidad de donar ya que no queremos donaciones obligatorias pero sí que pedimos a los miembros que recuerden cuál es el objetivo de esta aplicación.</p>
                    <h3 className="rightInfo">Donaciones</h3>
                    <p className="rightInfo fontWeightInfo">Cuando realices una donación, ésta se realizará mediante Stripe. Esta pasarela de pago es totalmente segura y no se almacenará en nuestro sistema ningún tipo de información relativa a las tarjetas de crédito empleadas.  En el apartado de donaciones simplemente deberás completar el nombre que quieres que aparezca como donante, la cantidad y los datos bancarios.</p>

                </div>
            </div>

            <div className="row section1Info">
                <div className="col-sm-8 InfoContainer">
                    <img className="elementInfo rounded-circle" src="https://wbly-prismic-v2.imgix.net/wonderbly/16f8de261ec0f067378ef5c3b968b5072bb77604_dedication-03.png?auto=format%2Ccompress" />
                    <h3 className="leftInfo">Mis relatos</h3>
                    <p className="leftInfo fontWeightInfo">Empieza una nueva historia, no importa si sabes cómo continuarla, simplemente dale forma y fíjate cómo evoluciona gracias a la comunidad. Cuanto más interesante sea, más personas querrán formar parte de ella, logrando así ayudar en mayor medida.</p>
                    <h3 className="leftInfo ">Mis secciones</h3>
                    <p className="leftInfo fontWeightInfo">Aporta a los relatos de los demás. Fíjate en qué personajes están en la historia, cómo son, la temática y no tengas miedo en crear nuevos personajes que enriquezcan el relato. ¿Se te ha ocurrido un giro de guión? ¡Adelante! </p>
                    <h3 className="leftInfo ">Normas</h3>
                    <p className="leftInfo fontWeightInfo">Respeta la temática impuesta por el autor principal. Crea tu propio contenido, no copies de los demás, lo que buscamos es fomentar la creatividad.</p>
                    <p className="leftInfo fontWeightInfo">No uses lenguaje ofensivo, y a no ser que el relato lo requiera, evita contenidos racistas o discriminatorios. Cuida la ortografía, revisa tu aportación antes de publicarla. Escribe con sentido y teniendo en cuenta las normas gramaticales.  </p>
                    <p className="leftInfo fontWeightInfo">Recuerda realizar una                  
                        <Link
                            to={{
                                pathname: `/donate`,
                            }}> <span className="donationInfo">DONACIÓN</span>    
                        </Link>
                    cada vez que aportes contenido a Tell the Story.</p>

                </div>
                <div className="col-sm-2 ">
                </div>

            </div>

        </div>
        );
    }
}


export default Information;