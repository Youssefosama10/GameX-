export default function Loading() {
  return (
    <div className="page-wrapper">
      <div className="container empty-state">
        <div className="pf-loading__spin" />
        <p>Preparing checkout...</p>
      </div>
    </div>
  );
}
