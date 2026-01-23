import './Button.css';

function Button({disabled, onClick, ButtonName}) {

return (
    <>
      <button
          disabled={disabled}
          onClick={onClick}
      >
          {ButtonName}
      </button>
  </>

);

}
export default Button;
