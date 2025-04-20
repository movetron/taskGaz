SELECT n.id AS node_id, n.status, s.color, s.description
FROM nodes n
JOIN statuses s ON n.status = s.id
WHERE n.group_id = :groupId; 
