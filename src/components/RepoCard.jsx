export default function RepoCard({ repo }) {
  return (
    <div className="bg-white dark:bg-[#161b22] rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-bold text-blue-600 hover:underline"
      >
        {repo.name}
      </a>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {repo.description || 'No description'}
      </p>
      <span className="inline-block mt-2 text-sm text-gray-700 dark:text-gray-300">
        ⭐ {repo.stargazers_count}
      </span>
    </div>
  );
}
