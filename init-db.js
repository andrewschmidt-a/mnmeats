// Simple database initialization script
import { createClient } from '@libsql/client';

const client = createClient({ 
  url: 'file:dev.db'
});

// Create tables based on the schema
const createTables = async () => {
  try {
    console.log('Creating database tables...');
    
    // Create customers table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE,
        name TEXT
      )
    `);
    
    // Create farms table  
    await client.execute(`
      CREATE TABLE IF NOT EXISTS farms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        city TEXT,
        state TEXT,
        long REAL,
        lat REAL,
        badges TEXT,
        imageUrl TEXT
      )
    `);
    
    // Create butchers table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS butchers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      )
    `);
    
    // Create SKUs table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS skus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        quantity TEXT
      )
    `);
    
    // Create orders table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_type TEXT,
        customer_id INTEGER REFERENCES customers(id),
        farm_id INTEGER REFERENCES farms(id),
        butcher_id INTEGER REFERENCES butchers(id),
        created_on INTEGER,
        accepted_on INTEGER,
        butchered_on INTEGER,
        processed_on INTEGER,
        expected_at INTEGER
      )
    `);
    
    // Create order_line table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS order_line (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quantity INTEGER,
        customer_id INTEGER REFERENCES customers(id),
        sku_id INTEGER REFERENCES skus(id)
      )
    `);
    
    // Create farm_inventory table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS farm_inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quantity INTEGER,
        sku_id INTEGER REFERENCES skus(id)
      )
    `);
    
    // Create farm_butcher table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS farm_butcher (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farm_id INTEGER REFERENCES farms(id),
        butcher_id INTEGER REFERENCES butchers(id)
      )
    `);
    
    // Create customer_order table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS customer_order (
        customer_id INTEGER REFERENCES customers(id),
        order_id INTEGER REFERENCES orders(id)
      )
    `);
    
    // Insert some sample data
    console.log('Adding sample data...');
    
    await client.execute(`
      INSERT OR IGNORE INTO farms (name, city, state, long, lat, badges, imageUrl) VALUES 
      ('Sunrise Farm', 'Rochester', 'MN', -92.4699, 44.0121, '["organic","grass-fed"]', '/static/farm-land.jpg'),
      ('Prairie View Ranch', 'Madison', 'WI', -89.4012, 43.0731, '["local","sustainable"]', '/static/farm-dusk.jpg'),
      ('Green Valley Farm', 'Duluth', 'MN', -92.1005, 46.7867, '["family-owned","organic"]', '/static/wis-ariel.jpg')
    `);
    
    await client.execute(`
      INSERT OR IGNORE INTO butchers (name) VALUES 
      ('Minnesota Meat Processing'),
      ('Wisconsin Butcher Co'),
      ('Artisan Meat Works')
    `);
    
    console.log('Database initialization complete!');
    
  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    client.close();
  }
};

createTables();