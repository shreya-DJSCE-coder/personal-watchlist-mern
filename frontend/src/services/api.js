// Base API URL - Uses Vite proxy in development or direct localhost:5000 if needed
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/movies';

export const getMovies = async (statusFilter = 'All', typeFilter = 'All') => {
  const params = new URLSearchParams();
  if (statusFilter && statusFilter !== 'All') params.append('status', statusFilter);
  if (typeFilter && typeFilter !== 'All') params.append('type', typeFilter);

  const url = `${API_BASE_URL}${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch movies');
  }
  return data.data || [];
};

export const addMovie = async (movieData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to add movie');
  }
  return data.data;
};

export const updateMovie = async (id, updateData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update movie');
  }
  return data.data;
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete movie');
  }
  return data;
};

