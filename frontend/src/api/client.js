const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),

  getJobs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/jobs${query ? `?${query}` : ''}`);
  },
  getJob: (id) => request(`/jobs/${id}`),
  createJob: (payload, token) => request('/jobs', { method: 'POST', body: payload, token }),
  updateJob: (id, payload, token) => request(`/jobs/${id}`, { method: 'PUT', body: payload, token }),
  deleteJob: (id, token) => request(`/jobs/${id}`, { method: 'DELETE', token }),

  applyToJob: (jobId, token) => request(`/applications/${jobId}`, { method: 'POST', token }),
  getMyApplications: (token) => request('/applications/my', { token }),
  getApplicationsForJob: (jobId, token) => request(`/applications/job/${jobId}`, { token }),
};
