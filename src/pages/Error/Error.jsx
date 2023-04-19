export default function Error({ message, context }) {
    return (
        <div className="alert alert-info text-center" role="alert">
            <p>{message}</p>
            <a href="/">Back to {context}</a>
        </div>
    );
}