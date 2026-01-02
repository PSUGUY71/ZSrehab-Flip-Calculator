import { supabase } from './supabase';
import { SavedDeal, LenderOption } from '../types';

export interface DealRow {
  id: string;
  user_id: string;
  name: string;
  address?: string;
  date: string;
  data: any;
  lenders: LenderOption[];
  created_at: string;
  updated_at: string;
}

// Convert database row to SavedDeal
export const rowToSavedDeal = (row: DealRow): SavedDeal => ({
  id: row.id, // Use UUID string
  name: row.name,
  date: row.date,
  data: row.data,
  lenders: row.lenders || [],
});

// Convert SavedDeal to database row
export const savedDealToRow = (deal: SavedDeal, userId: string): Partial<DealRow> => ({
  user_id: userId,
  name: deal.name,
  address: deal.data.address || '',
  date: deal.date,
  data: deal.data,
  lenders: deal.lenders || [],
});

// Get all deals for current user
export const getDeals = async (): Promise<SavedDeal[]> => {
  // Verify we have an active session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session?.user) {
    console.warn('⚠️ No active session in getDeals, returning empty array');
    return [];
  }

  const userId = session.user.id;
  console.log('🔍 getDeals: Fetching deals for user:', userId, 'email:', session.user.email);

  // RLS policies should automatically filter by auth.uid() = user_id
  // We'll rely on RLS for security, but add explicit filter as backup
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('user_id', userId)  // Explicit filter - should match RLS policy
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error fetching deals:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }

  console.log(`✅ getDeals: Found ${data?.length || 0} deals for user ${userId}`);
  if (data && data.length > 0) {
    console.log('Deal IDs:', data.map(d => ({ id: d.id, name: d.name, user_id: d.user_id })));
  }
  
  return (data || []).map(rowToSavedDeal);
};

// Check if a string is a valid UUID format
const isUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// Save a deal (insert or update)
export const saveDeal = async (deal: SavedDeal, userId: string): Promise<SavedDeal> => {
  const dealData = savedDealToRow(deal, userId);
  
  // If deal has a valid UUID id, try to update; otherwise insert as new
  if (deal.id && typeof deal.id === 'string' && isUUID(deal.id)) {
    // It's a valid UUID, try to update
    try {
      return await updateDeal(deal.id, deal, userId);
    } catch (error) {
      // If update fails (deal not found), insert as new
      console.log('Update failed, inserting as new deal');
    }
  }

  // Insert new deal (Supabase will generate a UUID)
  // Don't include id in dealData - let Supabase generate it
  const { data, error } = await supabase
    .from('deals')
    .insert([dealData])
    .select()
    .single();

  if (error) {
    console.error('Error saving deal:', error);
    throw error;
  }

  return rowToSavedDeal(data);
};

// Update a deal
export const updateDeal = async (dealId: string, deal: SavedDeal, userId: string): Promise<SavedDeal> => {
  const dealData = savedDealToRow(deal, userId);

  const { data, error } = await supabase
    .from('deals')
    .update(dealData)
    .eq('id', dealId)
    .eq('user_id', userId)  // Ensure user can only update their own deals
    .select()
    .single();

  if (error) {
    console.error('Error updating deal:', error);
    throw error;
  }

  return rowToSavedDeal(data);
};

// Delete a deal
export const deleteDeal = async (dealId: string): Promise<void> => {
  // Get the current session to ensure we have the authenticated user
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('deals')
    .delete()
    .eq('id', dealId)
    .eq('user_id', session.user.id);  // Ensure user can only delete their own deals

  if (error) {
    console.error('Error deleting deal:', error);
    throw error;
  }
};

// Find deal by name (for backward compatibility)
export const findDealByName = async (name: string): Promise<SavedDeal | null> => {
  // Get the current session to ensure we have the authenticated user
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    return null;
  }

  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('name', name)
    .eq('user_id', session.user.id)  // Filter by current user's ID
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error finding deal:', error);
    throw error;
  }

  return rowToSavedDeal(data);
};

