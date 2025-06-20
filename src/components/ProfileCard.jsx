export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="Box mb-4">
      <div className="Box-body d-flex flex-items-center">
        <img className="avatar-user mr-4" src={user.avatar_url} alt={user.login} width="128" />
        <div>
          <h2 className="f3 mb-0">{user.name || user.login}</h2>
          <p className="text-gray">@{user.login}</p>
          <p className="mt-1">{user.bio || 'No bio available'}</p>
          <p className="text-small text-gray mt-1">
            📍 {user.location || 'Unknown'} · 👥 {user.followers} followers
          </p>
        </div>
      </div>
    </div>
  );
}
