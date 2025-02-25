import { useNavigate } from "react-router-dom";
import "./LinkButton.css";

interface LinkButtonProps {
    component: React.ComponentType;
    text: string;
}

const LinkButton = (props: LinkButtonProps) => {
    const navigate = useNavigate();
    const path = `/${props.component.name.toLowerCase()}`;

    return (
    <div className="link-button-container">
        <button onClick={() => navigate(path)}>{props.text}</button>
    </div>
    )
}

export default LinkButton;