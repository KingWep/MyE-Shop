import { Link } from 'react-router-dom';

export default function PageHeader({ title, crumbs, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-2">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        {crumbs && crumbs.length > 0 && (
          <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <span key={idx} className="flex items-center gap-2">
                  {crumb.path && !isLast ? (
                    <Link to={crumb.path} className="hover:text-blue-600 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-slate-400" : "text-slate-500"}>
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && <span className="text-slate-300">›</span>}
                </span>
              );
            })}
          </div>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}
