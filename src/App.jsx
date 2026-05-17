import { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './App.css';

function App () {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex p-4 gap-4">
      {/* {session ? <Dashboard /> : <Auth />} */}
      <Dashboard />
    </div>
  );
}

export default App;
