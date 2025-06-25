export default function Task({ description }) {
    return (
        <div>
            <p>{description}</p>
            <button>Edit task</button>
            <button>Remove task</button>
            <button>Mark as Done</button>
        </div>
    )
}