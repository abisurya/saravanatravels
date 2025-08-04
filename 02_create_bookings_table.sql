CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Link to users table, allow null if user deletes account
  vehicle_type TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  return_date DATE NOT NULL,
  return_time TIME NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  special_requests TEXT,
  go_keyless BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings (user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON bookings (pickup_date);
