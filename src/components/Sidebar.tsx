import { getAllTags } from '../data/loader';

export function Sidebar() {
  const tags = getAllTags();
  return (
    <div className="content-secondary">
      <div className="widget">
        <div className="widget-header">探索标签</div>
        <div className="widget-body">
          <div className="tag-cloud">
            {tags.map(t => (
              <span key={t.name} className="tag-item">
                #{t.name}
                <span className="tag-count">{t.count}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
