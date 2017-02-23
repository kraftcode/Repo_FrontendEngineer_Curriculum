const Button = (props) => {

  const handleClick = () => {
    if(props.button.disabled){
      props.addNewEntry();
    } else {
      props.setEndForEntry();
    }
  };

  return (
    <button className={props.button.className} on-click={handleClick}>{props.button.text}</button>
  );
};

export default Button;
