import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import { componentList } from '../constants/globalConstants';

const findBreadcrumb = (path, list) => {
    for (const item of list) {
        if (item?.href === path) return item;
        if (item?.children) {
            const childItem = findBreadcrumb(path, item.children);
            if (childItem) return childItem;
        }
    }
    return null;
};

const isBaseBreadcrumb = (path) => {
    return componentList.some(item => item.href === path);
};

const BreadCrumb = ({ currentRoute }) => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const navigate = useNavigate();
    const pathnames = currentRoute.split('/').filter((x) => x);

    const handleClick = (event, href) => {
        event.preventDefault();
        navigate(href);
        removeBreadcrumb(href);
    };

    const addBreadcrumb = (path) => {
        const breadcrumb = findBreadcrumb(path, componentList);
        if (breadcrumb && !breadcrumbs.some(crumb => crumb.href === breadcrumb.href)) {
            setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, breadcrumb]);
        }
    };

    const removeBreadcrumb = (path) => {
        const index = breadcrumbs.findIndex(crumb => crumb.href === path);
        if (index !== -1) {
            setBreadcrumbs(breadcrumbs.slice(0, index + 1));
        }
    };

    useEffect(() => {
        if (isBaseBreadcrumb(currentRoute)) {
            setBreadcrumbs([]);
        }
        // Add breadcrumbs for the current route
        pathnames.forEach((name, index) => {
            const url = `/${pathnames.slice(0, index + 1).join('/')}`;
            addBreadcrumb(url);
            removeBreadcrumb(url);
        });
    }, [currentRoute]);

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs.map((crumb, index) => (
                crumb.href ? (
                    <Link
                        key={index}
                        href={crumb.href}
                        onClick={(event) => handleClick(event, crumb.href)}
                    >
                        <Typography align='left' className="header-title" variant='h5' component="div">
                            {crumb.label}
                        </Typography>
                    </Link>
                ) : (
                    <Typography key={index} align='left' className="header-title" variant='h5' component="div">
                        {crumb.label}
                    </Typography>
                )
            ))}
        </Breadcrumbs>
    );
};

export default BreadCrumb;
