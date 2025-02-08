import { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    style?: string;
}

const Button = ({onClick, children, style}: ButtonProps) => {
    return (
        <button onClick={onClick} className={`button ${style || ""}`}>
            {children}
        </button>
    )
}

export default Button;