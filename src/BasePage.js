import './BasePage.scss';
import logo from './images/walk.png';

function BasePage() {
  return (
    <div className="base">
      <header className="base__header">
        <img  src={logo} id='logo' alt="fireSpot"/>
        <p>
          The Hunt!
        </p>
      </header>
    </div>
  );
}

export default BasePage;
