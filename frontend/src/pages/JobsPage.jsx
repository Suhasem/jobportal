import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadJobs = async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getJobs(params);
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (keyword) params.keyword = keyword;
    if (location) params.location = location;
    loadJobs(params);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Open roles</h1>
        <p className="muted">Search current listings from recruiters on the platform.</p>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          placeholder="Keyword — e.g. Java, React"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          placeholder="Location — e.g. Bangalore"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn-primary" type="submit">Search</button>
      </form>

      {error && <div className="error-banner">{error}</div>}
      {loading && <p className="muted">Loading jobs…</p>}

      {!loading && jobs.length === 0 && (
        <div className="empty-state">
          <p>No jobs match yet.</p>
        </div>
      )}

      <div className="job-grid">
        {jobs.map((job) => (
          <Link to={`/jobs/${job.id}`} key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p className="job-meta">{job.location} {job.salary ? `· ₹${job.salary.toLocaleString()}` : ''}</p>
            <p className="job-desc">{job.description}</p>
            <span className="job-recruiter">Posted by {job.postedBy?.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
