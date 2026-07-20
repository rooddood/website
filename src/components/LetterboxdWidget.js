




import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './LetterboxdWidget.css';

// Helper to parse CSV string into array of objects
function parseCSV(csv) {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
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
  const [posters, setPosters] = useState({});

  useEffect(() => {
    const fetchCSV = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(process.env.PUBLIC_URL + '/letterboxd_data/reviews.csv');
        if (!res.ok) throw new Error('Failed to load reviews.csv');
        const text = await res.text();
        const parsed = parseCSV(text);
        parsed.sort((a, b) => {
          // Sometimes Date is empty and Watched Date is filled
          const dateStrA = a['Watched Date'] || a.Date || "1970-01-01";
          const dateStrB = b['Watched Date'] || b.Date || "1970-01-01";
          const dateA = new Date(dateStrA).getTime();
          const dateB = new Date(dateStrB).getTime();
          return dateB - dateA;
        });
        setReviews(parsed);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCSV();
  }, []);

  useEffect(() => {
    if (!reviews.length) return;
    let cancelled = false;
    const fetchPosters = async () => {
      const newPosters = {};
      for (const r of reviews) {
        const key = `${r.Name}|${r.Year}`;
        if (posters[key]) continue;
        try {
          const query = encodeURIComponent(r.Name);
          const year = r.Year ? `&year=${encodeURIComponent(r.Year)}` : '';
          const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}${year}`;
          const resp = await fetch(url);
          if (!resp.ok) throw new Error('TMDB error');
          const data = await resp.json();
          let posterPath = null;
          if (data.results && data.results.length > 0) {
            const match = data.results.find(m => m.release_date && m.release_date.startsWith(r.Year));
            posterPath = (match || data.results[0]).poster_path;
          }
          newPosters[key] = posterPath ? TMDB_IMAGE_BASE + posterPath : null;
        } catch (e) {
          newPosters[key] = null;
        }
        await new Promise(res => setTimeout(res, 30));
      }
      if (!cancelled) setPosters(prev => ({ ...prev, ...newPosters }));
    };
    fetchPosters();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 900, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 400, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <div className="letterboxd-container">
      {loading && <div className="letterboxd-status">Loading reviews…</div>}
      {error && <div className="letterboxd-status letterboxd-error">Error: {error}</div>}
      {!loading && !error && reviews.length === 0 && <div className="letterboxd-status">No reviews found.</div>}
      
      {!loading && !error && reviews.length > 0 && (
        <>
          <div className="lb-carousel-section">
            <Slider {...sliderSettings}>
              {reviews.map((r, idx) => {
                const posterKey = `${r.Name}|${r.Year}`;
                const posterUrl = posters[posterKey];
                return (
                  <a className="lb-carousel-item" key={idx} href={r['Letterboxd URI']} target="_blank" rel="noopener noreferrer">
                    <div className="lb-carousel-poster-wrapper">
                      {posterUrl ? (
                        <img className="lb-carousel-poster" src={posterUrl} alt={r.Name} />
                      ) : (
                        <div className="lb-carousel-no-poster">No Poster</div>
                      )}
                    </div>
                    <div className="lb-carousel-text">
                      <div className="lb-carousel-title">{r.Name} <span className="lb-carousel-year">({r.Year})</span></div>
                      {r.Rating && <div className="lb-carousel-rating">★ {r.Rating}</div>}
                      {r.Review && <div className="lb-carousel-review">{r.Review}</div>}
                    </div>
                  </a>
                );
              })}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default LetterboxdWidget;
