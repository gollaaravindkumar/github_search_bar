import RepoCard from './RepoCard';

export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p className="text-gray-500 text-center">No repositories found.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Top Repositories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
