import { useState, useEffect, useCallback } from 'react'

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ name: '', description: '', tech: '', year: '', photos: [] })
  const [editId, setEditId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])

  const loadProjects = useCallback(async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/projects')
    const data = await res.json()
    setProjects(data)
  }, [])

useEffect(() => {
  if (!token) return
  
  const fetchProjects = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/projects')
    const data = await res.json()
    setProjects(data)
  }
  
  fetchProjects()
}, [token])  

  const handleLogin = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    } else {
      alert('Email ou mot de passe incorrect !')
    }
  }

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
  }

  const handleSubmit = async () => {
    setUploading(true)
    let photoUrls = form.photos

    if (selectedFiles.length > 0) {
      const formData = new FormData()
      selectedFiles.forEach(file => formData.append('photos', file))

      const res = await fetch(import.meta.env.VITE_API_URL + '/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      const data = await res.json()
      photoUrls = [...photoUrls, ...data.urls]
    }

    const method = editId ? 'PUT' : 'POST'
    const url = editId
      ? `${import.meta.env.VITE_API_URL}/api/projects/${editId}`
      : `${import.meta.env.VITE_API_URL}/api/projects`

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...form, photos: photoUrls })
    })

    setForm({ name: '', description: '', tech: '', year: '', photos: [] })
    setSelectedFiles([])
    setEditId(null)
    setUploading(false)
    loadProjects()
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return
    await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    loadProjects()
  }

  const handleEdit = (project) => {
    setForm({ 
      name: project.name, 
      description: project.description, 
      tech: project.tech, 
      year: project.year, 
      photos: project.photos || [] 
    })
    setEditId(project._id)
    setSelectedFiles([])
  }

  const handleRemovePhoto = (index) => {
    const newPhotos = form.photos.filter((_, i) => i !== index)
    setForm({ ...form, photos: newPhotos })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  if (!token) return (
    <div style={{ minHeight: '100vh',  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: '40px', borderRadius: '12px', width: '360px' }}>
        <h2 style={{ color: '#f8f8f7', marginBottom: '24px', fontSize: '24px', textAlign: 'center' }}> Admin</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} /><br /><br />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} /><br /><br />
        <button onClick={handleLogin} style={{ ...btnStyle, width: '100%' }}>Se connecter</button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#f8f8f7', fontSize: '28px' }}> Gestion des projets</h1>
        <button onClick={handleLogout} style={{ ...btnStyle, backgroundColor: 'transparent', border: '1px solid #888780', color: '#f8f8f7' }}>
          Déconnexion
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '28px', borderRadius: '12px', marginBottom: '40px' }}>
        <h2 style={{ color: '#f8f8f7', marginBottom: '20px' }}>{editId ? '✏️ Modifier le projet' : ' Ajouter un projet'}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <input placeholder="Nom du projet" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
       
          <input placeholder="Technologies (ex: React, Node.js)" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} style={inputStyle} />
        </div>

        <textarea 
          placeholder="Description du projet..." 
          value={form.description} 
          onChange={e => setForm({ ...form, description: e.target.value })} 
          rows={4} 
          style={{ ...inputStyle, resize: 'vertical', marginBottom: '16px' }} 
        />

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#a8a69e', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
            📸 Photos du projet 
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            style={{ color: '#f8f8f7', fontSize: '13px' }}
          />
          {selectedFiles.length > 0 && (
            <p style={{ color: '#4ade80', fontSize: '12px', marginTop: '8px' }}>
               {selectedFiles.length} photo(s) sélectionnée(s)
            </p>
          )}
        </div>

        {form.photos.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {form.photos.map((photo, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={photo} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                <button 
                  onClick={() => handleRemovePhoto(i)}
                  style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '11px' }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleSubmit} disabled={uploading} style={{ ...btnStyle, marginTop: '8px' }}>
          {uploading ? 'Envoi en cours...' : editId ? 'Mettre à jour ✅' : 'Ajouter '}
        </button>
        {editId && (
          <button
            onClick={() => { setEditId(null); setForm({ name: '', description: '', tech: '', year: '', photos: [] }); setSelectedFiles([]) }}
            style={{ ...btnStyle, marginLeft: '12px', backgroundColor: 'transparent', border: '1px solid #888780', color: '#f8f8f7' }}
          >
            Annuler
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {projects.length === 0 && <p style={{ color: '#888780' }}>Aucun projet pour l'instant.</p>}
        {Array.isArray(projects) && projects.map(p => (
          <div key={p._id} style={{ backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {p.photos?.[0] && <img src={p.photos[0]} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />}
              <div>
                <p style={{ color: '#f8f8f7', fontWeight: '600', fontSize: '16px' }}>{p.name}</p>
                <p style={{ color: '#888780', fontSize: '13px' }}>{p.tech} — {p.year}</p>
                <p style={{ color: '#888780', fontSize: '12px' }}>{p.photos?.length || 0} photo(s)</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(p)} style={{ ...btnStyle, padding: '8px 16px', fontSize: '13px' }}> Modifier</button>
              <button onClick={() => handleDelete(p._id)} style={{ ...btnStyle, padding: '8px 16px', fontSize: '13px', backgroundColor: '#ef4444', borderColor: '#ef4444', color: '#fff' }}> Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)',
  border: '1px solid #333', borderRadius: '6px', color: '#f8f8f7',
  fontSize: '14px', boxSizing: 'border-box'
}

const btnStyle = {
  padding: '10px 24px', backgroundColor: '#f8f8f7', color: '#1a1a2e',
  border: 'none', borderRadius: '6px', fontSize: '14px',
  fontWeight: '600', cursor: 'pointer'
}