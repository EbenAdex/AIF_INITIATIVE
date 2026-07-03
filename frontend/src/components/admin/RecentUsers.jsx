function RecentUsers() {
  return (
    <div className="recent-users">

      <div className="table-header">
        <h3>New Users</h3>
      </div>

      <div className="user-list">

        <div className="recent-user">

          <img
            src="https://i.pravatar.cc/100?img=1"
            alt=""
          />

          <div>
            <h4>Sarah Mike</h4>
            <p>Frontend Developer</p>
          </div>

        </div>

        <div className="recent-user">

          <img
            src="https://i.pravatar.cc/100?img=5"
            alt=""
          />

          <div>
            <h4>David John</h4>
            <p>UI Designer</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default RecentUsers;