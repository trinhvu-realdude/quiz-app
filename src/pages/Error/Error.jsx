export default function Error({ message, context }) {
    return (
        <div className="alert alert-info text-center" role="alert">
            <p>{message}</p>
            <a href={`/${context === "home" ? "" : context}`}>Back to {context.substring(0, 1).toUpperCase() + context.substring(1)}</a>
        </div>
    );
}