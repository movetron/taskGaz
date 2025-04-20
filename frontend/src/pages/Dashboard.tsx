import React, { useEffect } from "react";
import InfoBlock from "../components/Blocks/InfoBlock";
import GroupsBlock from "../components/Blocks/GroupsBlock";
import NodesBlock from "../components/Blocks/NodesBlock";
import MetricsBlock from "../components/Blocks/MetricsBlock";
import InterfacesBlock from "../components/Blocks/InterfacesBlock";
import AdminBlock from "../components/Blocks/AdminBlock";
import AppsBlock from "../components/Blocks/AppsBlock";
import StatusBlock from "../components/Blocks/StatusBlock"
import { useDispatch } from "react-redux";
import { fetchGroups } from "../features/groups/groupsSlice";
import type { AppDispatch } from "../app/store";
import "../styles/dashboard.scss"
const Dashboard = () => {

    const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGroups());
    const interval = setInterval(() => {
      dispatch(fetchGroups());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="column">
        <StatusBlock/>
        <InfoBlock />
        <GroupsBlock />
      </div>
      <div className="column">
        <NodesBlock />
      </div>
      <div className="column">
        <MetricsBlock />
        <AppsBlock />
        <InterfacesBlock />
        <AdminBlock />
      </div>
    </div>
  );
};

export default Dashboard;
