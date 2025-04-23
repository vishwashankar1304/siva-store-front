
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminUsers = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch all user profiles
        const res = await fetch(`/rest/v1/profiles`, {
          headers: {
            apikey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '',
            Authorization: `Bearer ${localStorage.getItem('supabase.auth.token') || ''}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) throw new Error('Cannot fetch users');
        const data = await res.json();
        setUsers(data || []);
      } catch (err) {
        setError('Failed to load users/profiles.');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) fetchUsers();
  }, [currentUser]);

  const handleViewProfile = async (id) => {
    setProfileLoading(true);
    setSelectedProfile(null);
    try {
      const res = await fetch(`/rest/v1/profiles?id=eq.${id}`, {
        headers: {
          apikey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '',
          Authorization: `Bearer ${localStorage.getItem('supabase.auth.token') || ''}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Cannot fetch profile');
      const data = await res.json();
      setSelectedProfile(data?.[0] || null);
    } catch (err) {
      setSelectedProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  if (!currentUser?.isAdmin) return <div className="p-6 text-red-600">Admin Only</div>;
  if (loading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">User ID</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="py-2 px-4 border-b">{u.id}</td>
              <td className="py-2 px-4 border-b">{u.name || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleViewProfile(u.id)}>
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {profileLoading && <div>Loading profile...</div>}
      {selectedProfile && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
          <div>
            <strong>Name: </strong>
            <span>{selectedProfile.name || 'N/A'}</span>
          </div>
          <div>
            <strong>User ID: </strong>
            <span>{selectedProfile.id}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
