import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSiteById } from "../../authoritySlice";

export default function SiteDetailPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const site = useSelector(state => state.authority.site);

  useEffect(() => {
    if (id) {
      dispatch(fetchSiteById(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <pre>{site ? JSON.stringify(site) : ''}</pre>
    </div>
  );
}
