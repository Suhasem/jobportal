import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function RecruiterApplicantsPage() {
  const { jobId } = useParams();
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getApplicationsForJob(jobId, token)
      .then(setApplications)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [jobId, token]);

  return (
    <div className="page">
      <Link to={`/jobs/${jobId}`} className="back-link">← Back to listing</Link>

      <div className="page-header">
        <h1>Applicants</h1>
        <p className="muted">Everyone who has applied to this role.</p>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {loading && <p className="muted">Loading…</p>}

      {!loading && applications.length === 0 && (
        <div className="empty-state"><p>No applicants yet.</p></div>
      )}

      <div className="application-list">
        {applications.map((app, idx) => (
          <div className="application-row" key={idx}>
            <div>
              <strong>{app.applicantName}</strong>
              <p className="muted small">Applied for {app.jobTitle}</p>
            </div>
            <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
