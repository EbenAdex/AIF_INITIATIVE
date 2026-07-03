import "../../styles/button.css";

function Button({
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  children,
  className = "",
}) {
  const classNames = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames}
    >
      {children}
    </button>
  );
}

export default Button;
