import axios from 'axios'

const API_URL = 'http://localhost:8080/api/users/api/users'

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export const updateUser = async (id, userData) => {
  const payload = {
    username: userData.username,
    email: userData.email,
    grade: userData.grade,
    password: userData.password,
    role: userData.role, // Estático
    subject: userData.subject, // Estático
    department: userData.department, // Estático
  }

  await axios.put(`${API_URL}/${id}`, payload)
}
