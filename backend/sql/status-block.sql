SELECT s.*
FROM nodes n
JOIN groups_nodes gn ON n.id = gn.node_id
JOIN statuses s ON n.status = s.id
WHERE gn.group_id = ?;
