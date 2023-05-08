import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Breadcrumb() {
    const { pathname } = useLocation();
    const pathnames = useMemo(() => {
        const segments = pathname.split('/').filter((path) => path);
    
        if (segments[0] === "practice" || segments[0] === "test") {
            segments.shift();
        }
    
        return segments.map((path, index) => ({
            name: path,
            path: `/${segments.slice(0, index + 1).join('/')}`
        }));
    }, [pathname]);
  
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-center">
                <li className="breadcrumb-item">
                    {pathname === '/' ? (
                        <span>Home</span>
                    ) : (
                        <Link to="/">Home</Link>
                    )}
                </li>
                {pathnames.map((pathname, index) => (
                    <li className="breadcrumb-item" key={pathname.path}>
                    {
                        index === pathnames.length - 1 ? (
                            <span>{pathname.name}</span>
                        ) : (
                            <Link to={pathname.path}>{pathname.name}</Link>
                        )
                    }
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumb;