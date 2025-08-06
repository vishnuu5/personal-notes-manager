import { useState, useEffect } from "react"
import NoteForm from "../components/NoteForm"
import NoteList from "../components/NoteList"
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes"
import { useNotification } from "../context/NotificationContext"

function DashboardPage() {
    const [notes, setNotes] = useState([])
    const [editingNote, setEditingNote] = useState(null)
    const { showNotification } = useNotification()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchNotes = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getNotes()
            setNotes(data)
            showNotification("Notes loaded successfully!", "success")
        } catch (err) {
            setError("Failed to load notes. Please try logging in again.")
            showNotification("Failed to load notes.", "error")
            console.error("Error fetching notes:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    const handleAddOrUpdateNote = async (noteData) => {
        try {
            if (editingNote) {
                const updatedNote = await updateNote(editingNote._id, noteData)
                setNotes(notes.map((note) => (note._id === updatedNote._id ? updatedNote : note)))
                showNotification("Note updated successfully!", "success")
                setEditingNote(null)
            } else {
                const newNote = await createNote(noteData)
                setNotes([newNote, ...notes])
                showNotification("Note created successfully!", "success")
            }
        } catch (err) {
            showNotification(`Failed to ${editingNote ? "update" : "create"} note.`, "error")
            console.error(`Error ${editingNote ? "updating" : "creating"} note:`, err)
        }
    }

    const handleDeleteNote = async (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await deleteNote(id)
                setNotes(notes.filter((note) => note._id !== id))
                showNotification("Note deleted successfully!", "info")
            } catch (err) {
                showNotification("Failed to delete note.", "error")
                console.error("Error deleting note:", err)
            }
        }
    }

    const handleEditClick = (note) => {
        setEditingNote(note)
    }

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background">
                <p className="text-lg text-text">Loading notes...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        )
    }

    return (
        <div className="py-8">
            <h1 className="text-4xl font-bold text-text mb-8 text-center">Your Notes Dashboard</h1>
            <NoteForm
                onSubmit={handleAddOrUpdateNote}
                initialData={editingNote || { title: "", content: "" }}
                isEditing={!!editingNote}
            />
            {editingNote && (
                <button
                    onClick={() => setEditingNote(null)}
                    className="mb-6 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
                >
                    Cancel Edit
                </button>
            )}
            <NoteList notes={notes} onDelete={handleDeleteNote} onEdit={handleEditClick} />
        </div>
    )
}

export default DashboardPage
