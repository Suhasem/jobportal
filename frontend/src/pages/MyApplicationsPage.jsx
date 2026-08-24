import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function MyApplicationsPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMyApplications(token)
      .then(setApplications)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>My applications</h1>
        <p className="muted">Roles you've applied to.</p>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {loading && <p className="muted">Loading…</p>}

      {!loading && applications.length === 0 && (
        <div className="empty-state"><p>You haven't applied to anything yet.</p></div>
      )}

      <div className="application-list">
        {applications.map((app, idx) => (
          <div className="application-row" key={idx}>
            <div>
              <strong>{app.jobTitle}</strong>
              <p className="muted small">Applicant: {app.applicantName}</p>
            </div>
            <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
