




import React, { useEffect, useState } from 'react';
import './LetterboxdWidget.css';

// Helper to parse CSV string into array of objects
function parseCSV(csv) {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    // Handle quoted fields with commas
    const values = [];
    let cur = '', inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        values.push(cur);
        cur = '';
      } else {
        cur += char;
      }
    }
    values.push(cur);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = (values[idx] || '').trim();
    });
    return obj;
  });
}


const TMDB_API_KEY = 'd4573f115f2ddd832da2fcd0658ea7e4';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

const LetterboxdWidget = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posters, setPosters] = useState({}); // { 'Name|Year': posterUrl }
  const [selected, setSelected] = useState(null); // review object for modal

  // Fetch reviews CSV
  useEffect(() => {
    const fetchCSV = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(process.env.PUBLIC_URL + '/letterboxd_data/reviews.csv');
        if (!res.ok) throw new Error('Failed to load reviews.csv');
        const text = await res.text();
        const parsed = parseCSV(text);
        setReviews(parsed);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCSV();
  }, []);

  // Fetch posters from TMDB for each review
  useEffect(() => {
    if (!reviews.length) return;
    let cancelled = false;
    const fetchPosters = async () => {
      const newPosters = {};
      for (const r of reviews) {
        const key = `${r.Name}|${r.Year}`;
        if (posters[key]) {
          newPosters[key] = posters[key];
          continue;
        }
        try {
          const query = encodeURIComponent(r.Name);
          const year = r.Year ? `&year=${encodeURIComponent(r.Year)}` : '';
          const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}${year}`;
          const resp = await fetch(url);
          if (!resp.ok) throw new Error('TMDB error');
          const data = await resp.json();
          let posterPath = null;
          if (data.results && data.results.length > 0) {
            // Try to match year exactly if possible
            const match = data.results.find(m => m.release_date && m.release_date.startsWith(r.Year));
            posterPath = (match || data.results[0]).poster_path;
          }
          if (posterPath) {
            newPosters[key] = TMDB_IMAGE_BASE + posterPath;
          } else {
            newPosters[key] = null;
          }
        } catch (e) {
          newPosters[key] = null;
        }
        // TMDB rate limit: 50 req/sec, add a small delay to be safe
        await new Promise(res => setTimeout(res, 30));
      }
      if (!cancelled) setPosters(prev => ({ ...prev, ...newPosters }));
    };
    fetchPosters();
    return () => { cancelled = true; };
    // eslint-disable-next-line
  }, [reviews]);

  return (
    <>
      {loading && <div className="letterboxd-status">Loading reviews…</div>}
      {error && <div className="letterboxd-status letterboxd-error">Error: {error}</div>}
      {!loading && !error && reviews.length === 0 && <div className="letterboxd-status">No reviews found.</div>}
      {!loading && !error && reviews.length > 0 && (
        <>
          {/* Horizontal scrollable movie widget */}
          <div className="lb-horizontal-scroll">
            {reviews.map((r, idx) => {
              const posterKey = `${r.Name}|${r.Year}`;
              const posterUrl = posters[posterKey];
              return (
                <div
                  className="lb-embed-card-horizontal"
                  key={idx}
                  onClick={() => setSelected(r)}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') setSelected(r); }}
                  title={`Click to view review for ${r.Name}`}
                >
                  {posterUrl ? (
                    <img className="lb-embed-poster" src={posterUrl} alt={r.Name + ' poster'} />
                  ) : (
                    <div className="lb-embed-no-poster">No Poster</div>
                  )}
                  <div className="lb-embed-movie-title">
                    {r.Name} <span className="lb-embed-movie-year">({r.Year})</span>
                  </div>
                  {r.Rating && <div className="lb-embed-rating">★ {r.Rating}</div>}
                </div>
              );
            })}
          </div>
          <div className="letterboxd-embed-caption">Scroll to see more. Click a poster to view the full review</div>
        </>
      )}

      {/* Modal for expanded review */}
      {selected && (
        <div
          className="lb-modal-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="lb-modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="lb-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            {(() => {
              const posterKey = `${selected.Name}|${selected.Year}`;
              const posterUrl = posters[posterKey];
              return posterUrl ? (
                <img className="lb-modal-poster" src={posterUrl} alt={selected.Name + ' poster'} />
              ) : (
                <div className="lb-modal-no-poster">No Poster</div>
              );
            })()}
            <div className="lb-modal-title">
              {selected.Name} <span className="lb-modal-year">({selected.Year})</span>
            </div>
            <div className="lb-modal-date">{selected.Date}</div>
            <div className="lb-modal-link">
              <a href={selected['Letterboxd URI']} target="_blank" rel="noopener noreferrer">View on Letterboxd</a>
            </div>
            {selected.Rating && <div className="lb-modal-rating">★ {selected.Rating}</div>}
            {selected.Rewatch && <div className="lb-modal-rewatch">Rewatch: {selected.Rewatch}</div>}
            {selected['Watched Date'] && <div className="lb-modal-watched">Watched: {selected['Watched Date']}</div>}
            {selected.Tags && selected.Tags.length > 0 && <div className="lb-modal-tags">Tags: {selected.Tags}</div>}
            {selected.Review && <div className="lb-modal-review"><b>Review:</b> {selected.Review}</div>}
          </div>
        </div>
      )}
  {/* (caption moved above) */}
    </>
  );
};

export default LetterboxdWidget;
