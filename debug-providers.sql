-- Check if service_providers table exists and see its structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'service_providers' 
ORDER BY ordinal_position;

-- Check if provider_applications table exists (in case that's what's being used)
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'provider_applications' 
ORDER BY ordinal_position;

-- Show actual data from service_providers table (if it exists)
SELECT id, business_name, status, show_in_directory, service_areas, services_offered 
FROM service_providers 
LIMIT 5;

-- Show actual data from provider_applications table (if that's what you have)
SELECT id, business_name, status, service_areas, services_offered 
FROM provider_applications 
LIMIT 5;