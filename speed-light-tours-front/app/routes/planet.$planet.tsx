// routes/planet.$planet.tsx (Remix) o routes/planet.[planet].tsx (otros setups)
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlanetRoute() {
  // 'planet' vendrá de la parte dinámica de la URL: /planet/:planet
  const { planet } = useParams<{ planet: string }>();
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    if (planet) {
      axios
        .get(`http://localhost:3001/locations?planet=${planet}`)
        .then((response) => setLocations(response.data))
        .catch((error) => console.error('Error:', error));
    }
  }, [planet]);

  return (
    <div>
      <h1>Planeta: {planet}</h1>
      {locations.map((loc) => (
        <div key={loc.id}>
          <p>{loc.name}</p>
        </div>
      ))}
    </div>
  );
}
