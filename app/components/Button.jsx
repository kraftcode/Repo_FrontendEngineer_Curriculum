const Button = (props) => {
  const handleClick = (event) => {
    alert(props.message);
  };
  console.log(props);
  return (
    <button className={props.className} on-click={handleClick}>Click Clack!</button>
  );
};

export default Button;
