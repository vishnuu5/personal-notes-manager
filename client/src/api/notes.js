const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      throw new Error("Failed to create note");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
