import "./HeroStyles.css";
import { Link } from "react-router-dom";
import { Button } from "react-scroll";
const Hero = (props)=> {
  return (
    <>
      <div className={props.cName}>
      
    
      <div className="hero-text">
      <h1 >{props.title+' '}
              <span id={props.ID}>
               
              </span>
            </h1>
            <br/>
            <br/>
            <br/>
            <br/>
        <p>{props.text1}</p>
        
        <p>{props.text2}</p>
        <p>{props.text3}</p>
        <Link onClick={props.link} className={props.btnClass}>
          {props.buttonText}
        </Link>
      </div>
      </div>
     
    </>
  );
}

export default Hero;
