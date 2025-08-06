
function NoteList({ notes, onDelete, onEdit }) {
    if (!notes || notes.length === 0) {
        return (
            <div className="text-center text-gray-600 p-8 bg-white rounded-lg shadow-md">
                <p className="text-lg">No notes yet. Start by creating one!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
                <div key={note._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-text mb-2">{note.title}</h3>
                        <p className="text-gray-700 mb-4 break-words whitespace-pre-wrap">{note.content}</p>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            onClick={() => onEdit(note)}
                            className="bg-accent text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors duration-200 text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(note._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-right">
                        Created: {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default NoteList
