"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [editingId, setEditingId] = useState(null)

  // 🔹 Read - Ambil data dari Supabase
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })
    if (!error) setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // 🔹 Create - Tambah user baru
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!username || !password) return alert("Isi semua field!")

    const { error } = await supabase.from("users").insert([{ username, password }])
    if (error) {
      alert("❌ Gagal tambah user")
    } else {
      alert("✅ User ditambahkan")
      setUsername("")
      setPassword("")
      fetchUsers()
    }
  }

  // 🔹 Update - Edit user
  const handleUpdate = async (id) => {
    const { error } = await supabase.from("users").update({ username, password }).eq("id", id)
    if (error) {
      alert("❌ Gagal update")
    } else {
      alert("✅ User diupdate")
      setEditingId(null)
      setUsername("")
      setPassword("")
      fetchUsers()
    }
  }

  // 🔹 Delete - Hapus user
  const handleDelete = async (id) => {
    const { error } = await supabase.from("users").delete().eq("id", id)
    if (error) {
      alert("❌ Gagal hapus")
    } else {
      alert("✅ User dihapus")
      fetchUsers()
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📋 Admin Panel Users</h1>

      {/* Form Tambah / Update */}
      <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(editingId) } : handleAdd}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {editingId ? "Update User" : "Tambah User"}
        </button>
      </form>

      {/* Tabel User */}
      <table border="1" cellPadding="10" style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.password}</td>
              <td>
                <button onClick={() => { setEditingId(u.id); setUsername(u.username); setPassword(u.password) }}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
