import "./Error.css";

interface ErrorProps {
    message: string | null;
}

const Error = (props: ErrorProps) => {
    return (
        <div className="error-container">
            <p>{props.message}</p>
        </div>
    );
}

export default Error;