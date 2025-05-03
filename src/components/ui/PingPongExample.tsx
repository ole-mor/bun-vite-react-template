import { useState, useEffect } from 'react';
import { ping } from '../../api/ping';

function PingPongExample() {
  const [pingResult, setPingResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testPing = async () => {
      try {
        setLoading(true);
        const result = await ping();
        setPingResult(result.message);
        setError('');
      } catch (error) {
        setPingResult('');
        setError('Error connecting to server');
        console.error('Ping error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    testPing();
  }, []);

  return (
    <div>
      <h2>Ping Test</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Server says: <strong>{pingResult}</strong></p>
      )}
      
      <button 
        onClick={() => {
          setLoading(true);
          ping()
            .then(result => {
              setPingResult(result.message);
              setError('');
            })
            .catch(err => {
              setPingResult('');
              setError('Error connecting to server');
              console.error('Ping error:', err);
            })
            .finally(() => setLoading(false));
        }}
        disabled={loading}
      >
        Ping Again
      </button>
    </div>
  );
}

export default PingPongExample;