import { db, ws, json, error } from '@appdeploy/sdk';
const TABLE = 'entity_subscriptions';
async function all() {
  const { items } = await db.list(TABLE, { limit: 1000 });
  return items as any[];
}
export async function removeSubscriptionsByConnection(connectionId: string) {
  const ids = (await all()).filter(x => x.connection_id === connectionId).map(x => x.id);
  if (ids.length) await db.delete(TABLE, ids);
}
export async function addSubscription(entity_type: string, entity_id: string, connection_id: string) {
  await db.add(TABLE, [{ entity_type, entity_id, connection_id, created_at: Date.now() }]);
}
export async function removeSubscriptions(entity_type: string, entity_id: string, connection_id: string) {
  const ids = (await all()).filter(x => x.entity_type === entity_type && x.entity_id === entity_id && x.connection_id === connection_id).map(x => x.id);
  if (ids.length) await db.delete(TABLE, ids);
}
export async function notifySubscribers(entity_type: string, entity_id: string, payload: unknown, excludeConnectionId?: string) {
  const ids = [...new Set((await all()).filter(x => x.entity_type === entity_type && x.entity_id === entity_id && x.connection_id !== excludeConnectionId).map(x => x.connection_id))];
  if (ids.length) await ws.send(ids, { v: 1, type: 'entity.update', payload: { entity_type, entity_id, data: payload } });
}
export const realtimeSubscriptionRoutes = {
  'POST /api/subscriptions': [async ({ body }: any) => {
    const { entity_type, entity_id, connection_id } = body || {};
    if (!entity_type || !entity_id || !connection_id) return error('entity_type, entity_id, connection_id are required');
    await addSubscription(entity_type, entity_id, connection_id); return json({ ok: true });
  }],
  'POST /api/subscriptions/remove': [async ({ body }: any) => {
    const { entity_type, entity_id, connection_id } = body || {};
    if (!entity_type || !entity_id || !connection_id) return error('entity_type, entity_id, connection_id are required');
    await removeSubscriptions(entity_type, entity_id, connection_id); return json({ ok: true });
  }]
};