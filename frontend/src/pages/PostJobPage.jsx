import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function PostJobPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', location: '', salary: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { ...form, salary: form.salary ? Number(form.salary) : null };
      const job = await api.createJob(payload, token);
      navigate(`/jobs/${job.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page narrow">
      <h1>Post a job</h1>
      <p className="muted">This listing will be visible to every job seeker on the platform.</p>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <div className="error-banner">{error}</div>}

        <label>
          Title
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>

        <label>
          Description
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <label>
          Location
          <input
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </label>

        <label>
          Salary (annual, optional)
          <input
            type="number"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
        </label>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Posting…' : 'Post job'}
        </button>
      </form>
    </div>
  );
}
