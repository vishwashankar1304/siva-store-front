
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/rest/v1/profiles?id=eq.${currentUser?.id}`, {
          headers: {
            apikey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '',
            Authorization: `Bearer ${localStorage.getItem('supabase.auth.token') || ''}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) throw new Error('Cannot fetch profile');
        const data = await res.json();
        setProfile(data?.[0] || null);
      } catch (err) {
        setError('Failed to load profile details.');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) fetchProfile();
  }, [currentUser]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="mb-3">
        <strong>Name: </strong>
        <span>{profile?.name || 'N/A'}</span>
      </div>
      <div className="mb-3">
        <strong>Email: </strong>
        <span>{currentUser?.email}</span>
      </div>
      <div className="mb-3">
        <strong>User ID: </strong>
        <span>{currentUser?.id}</span>
      </div>
    </div>
  );
};

export default Dashboard;
