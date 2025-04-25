import axios, { AxiosError } from 'axios';

export interface Job {
  _id?: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  date: string | Date;
  link?: string;
}

const api = axios.create({
  baseURL: 'https://studentjobtrackers-1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const errorMessage = (error.response?.data as { message?: string })?.message ||
                       error.message || 
                       'Request failed';
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await api.get('/jobs');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch jobs');
  }
};

export const fetchJob = async (id: string): Promise<Job> => {
  try {
    const response = await api.get(`/jobs/${id}`);
    if (!response.data) throw new Error('Job not found');
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch job');
  }
};

export const createJob = async (jobData: Omit<Job, '_id'>): Promise<Job> => {
  try {
    const response = await api.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create job');
  }
};

export const updateJob = async (id: string, jobData: Partial<Job>): Promise<Job> => {
  try {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update job');
  }
};

export const deleteJob = async (id: string): Promise<void> => {
  try {
    await api.delete(`/jobs/${id}`);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to delete job');
  }
};