export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p className="text-gray-500">No repositories found.</p>;
  }

  return (
    <div>
      <h3 className="f4 mb-3">Top Repositories</h3>
      <div className="d-flex flex-wrap">
        {repos.map(r => (
          <div key={r.id} className="Box mr-3 mb-3" style={{ width: 'calc(50% - 12px)' }}>
            <div className="Box-body">
              <a href={r.html_url} target="_blank" className="text-bold text-blue">
                {r.name}
              </a>
              <p className="text-small text-gray">{r.description || 'No description'}</p>
              <span className="text-small text-gray">⭐ {r.stargazers_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
