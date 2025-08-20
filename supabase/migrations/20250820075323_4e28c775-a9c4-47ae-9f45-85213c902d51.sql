-- Fix the function search path issue by updating the is_admin_user function
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- This function can be modified later to check for admin roles
  -- For now, it returns false to prevent any access
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;