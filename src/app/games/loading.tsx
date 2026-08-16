export default function Loading() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="empty-state">
          <div className="pf-loading__spin" />
          <p>Loading games...</p>
        </div>
      </div>
    </div>
  );
}
