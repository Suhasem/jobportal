import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, token } = useAuth();

  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [applyStatus, setApplyStatus] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    api.getJob(id).then(setJob).catch((err) => setError(err.message));
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setApplyStatus('');
    try {
      await api.applyToJob(id, token);
      setApplyStatus('applied');
    } catch (err) {
      setApplyStatus(err.message);
    } finally {
      setApplying(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this job listing?')) return;
    try {
      await api.deleteJob(id, token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="page"><div className="error-banner">{error}</div></div>;
  if (!job) return <div className="page"><p className="muted">Loading…</p></div>;

  const isOwner = user?.role === 'RECRUITER' && job.postedBy?.email === user?.email;

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to all jobs</Link>

      <div className="job-detail-card">
        <h1>{job.title}</h1>
        <p className="job-meta">{job.location} {job.salary ? `· ₹${job.salary.toLocaleString()}` : ''}</p>
        <p className="job-recruiter">Posted by {job.postedBy?.name}</p>
        <p className="job-detail-desc">{job.description}</p>

        {isOwner && (
          <div className="owner-actions">
            <Link className="btn-ghost" to={`/applications/job/${job.id}`}>View applicants</Link>
            <button className="btn-danger" onClick={handleDelete}>Delete listing</button>
          </div>
        )}

        {!isOwner && user?.role !== 'RECRUITER' && (
          <div className="apply-block">
            {isAuthenticated ? (
              <button className="btn-primary" onClick={handleApply} disabled={applying || applyStatus === 'applied'}>
                {applyStatus === 'applied' ? 'Applied ✓' : applying ? 'Applying…' : 'Apply now'}
              </button>
            ) : (
              <Link className="btn-primary-link" to="/login">Log in to apply</Link>
            )}
            {applyStatus && applyStatus !== 'applied' && <p className="error-text">{applyStatus}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
