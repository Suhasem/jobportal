import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostJobPage from './pages/PostJobPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import RecruiterApplicantsPage from './pages/RecruiterApplicantsPage';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute role="RECRUITER">
                <PostJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute role="JOB_SEEKER">
                <MyApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications/job/:jobId"
            element={
              <ProtectedRoute role="RECRUITER">
                <RecruiterApplicantsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
