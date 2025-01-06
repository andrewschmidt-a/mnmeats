import { integer, sqliteTable, sqliteView, text, real, } from "drizzle-orm/sqlite-core";
import { relations, eq, getTableColumns } from "drizzle-orm";

// Customers table
export const customers = sqliteTable('customers', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text("user_id").unique(),
    name: text('name'),
});

// Farms table
export const farms = sqliteTable('farms', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    city: text('city'),
    state: text('state', {enum: ['MN', 'WI']}),
    long: real('long'),
    lat: real('lat'),
    badges: text('badges', {mode: "json"}),
    imageUrl: text('imageUrl')
});
// Butchers table
export const butchers = sqliteTable('butchers', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
});

// SKUs table
export const skus = sqliteTable('skus', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    type: text('type', {enum: ["COW", "PIG"]}),  // 'cow' or 'pig'
    quantity: text('quantity', {enum: ["QUARTER", "HALF", "FULL"]}),  // Quantity available in terms of full animals
});

// Orders table
export const orders = sqliteTable('orders', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    orderType: text('order_type'),  // 'now' or 'prepay'
    customerId: integer('customer_id').references(() => customers.id),
    farmId: integer('farm_id').references(() => farms.id),
    butcherId: integer('butcher_id').references(() => butchers.id),
    createdOn: integer('created_on', { mode: 'timestamp_ms' }),
    acceptedAt: integer('accepted_on', { mode: 'timestamp_ms' }),
    sentToButcherOn: integer('butchered_on', { mode: 'timestamp_ms' }),
    processedOn: integer('processed_on', { mode: 'timestamp_ms' }),
    expectedAvailability: integer('expected_at', { mode: 'timestamp_ms' })
});
export const orderLines = sqliteTable('order_line', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    quantity: integer('quantity'), 
	customerId: integer('customer_id').references(() => customers.id),
    skuId: integer('sku_id').references(() => skus.id),
});
export const farmInventory = sqliteTable('farm_inventory', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    quantity: integer('quantity'), 
    skuId: integer('sku_id').references(() => skus.id),
});

export const farmButcherAssociation = sqliteTable('farm_butcher', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    farmId: integer('farm_id').references(() => farms.id),
    butcherId: integer('butcher_id').references(() => butchers.id),
});

// Customer-Order Association table for many-to-many relationship
export const customerOrderAssociation = sqliteTable('customer_order', {
    customerId: integer('customer_id').references(() => customers.id),
    orderId: integer('order_id').references(() => orders.id),
});

// Relations
export const customersRelations = relations(customers, ({ many }) => ({
    orders: many(customerOrderAssociation),
}));

export const farmsRelations = relations(farms, ({ many }) => ({
    inventory: many(farmInventory),
    butchers: many(farmButcherAssociation),  // One-to-many relationship with butchers
}));

export const butchersRelations = relations(butchers, ({ many }) => ({
    orders: many(customerOrderAssociation),
	farms: many(farmButcherAssociation)
}));

export const skusRelations = relations(skus, ({ one }) => ({
    orders: one(orders),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
    customers: many(customerOrderAssociation),
}));

