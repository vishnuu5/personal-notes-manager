
import { useState, useEffect } from "react"

function NoteForm({ onSubmit, initialData = { title: "", content: "" }, isEditing = false }) {
    const [title, setTitle] = useState(initialData.title)
    const [content, setContent] = useState(initialData.content)

    useEffect(() => {
        setTitle(initialData.title)
        setContent(initialData.content)
    }, [initialData])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) {
            alert("Title and content cannot be empty.")
            return
        }
        onSubmit({ title, content })
        if (!isEditing) {
            setTitle("")
            setContent("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-text mb-4">{isEditing ? "Edit Note" : "Create New Note"}</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note Title"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>
                <textarea
                    id="content"
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none resize-y"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note Content"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-semibold"
            >
                {isEditing ? "Update Note" : "Add Note"}
            </button>
        </form>
    )
}

export default NoteForm
