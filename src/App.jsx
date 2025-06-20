import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import DarkModeToggle from './components/DarkModeToggle';
import Pagination from './components/Pagination';

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const REPOS_PER_PAGE = 5;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const fetchGitHubData = async (username) => {
    setLoading(true);
    setError('');
    setUserData(null);
    setRepos([]);
    setCurrentPage(1);
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('User not found');
      const user = await userRes.json();
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const allRepos = await reposRes.json();
      const sortedRepos = allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      setUserData(user);
      setRepos(sortedRepos);
      setTotalPages(Math.ceil(sortedRepos.length / REPOS_PER_PAGE));
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      dx: Math.random() * 0.5,
      dy: Math.random() * 0.5,
    }));

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let dot of dots) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        if (distance < 150) {
          dot.x += Math.cos(angle) * 0.5;
          dot.y += Math.sin(angle) * 0.5;
        } else {
          dot.x += dot.dx;
          dot.y += dot.dy;
        }

        if (dot.x > canvas.width || dot.x < 0) dot.dx *= -1;
        if (dot.y > canvas.height || dot.y < 0) dot.dy *= -1;

        const fillColor = isDark
          ? 'rgba(255, 255, 255, 0.4)'
          : 'rgba(255, 0, 0, 0.4)';

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedRepos = repos.slice((currentPage - 1) * REPOS_PER_PAGE, currentPage * REPOS_PER_PAGE);

  return (
    <div className="relative z-10 flex flex-col items-center justify-start px-4 min-h-screen pt-10">
      <div className="w-full max-w-4xl text-center space-y-8">
    
        <div className="bg-white/90 dark:bg-[#161b22]/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <SearchBar onSearch={fetchGitHubData} />
        </div>

        

        <div className="space-y-6">
          {loading && <p className="text-lg text-center">🔄 Loading...</p>}
          {error && <p className="text-red-500 text-lg text-center">❌ {error}</p>}
          {userData && <ProfileCard user={userData} />}
          {paginatedRepos.length > 0 && <RepoList repos={paginatedRepos} />}

          {repos.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
