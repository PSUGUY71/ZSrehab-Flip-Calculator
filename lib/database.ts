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
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching deals:', error);
    throw error;
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
  const { error } = await supabase
    .from('deals')
    .delete()
    .eq('id', dealId);

  if (error) {
    console.error('Error deleting deal:', error);
    throw error;
  }
};

// Find deal by name (for backward compatibility)
export const findDealByName = async (name: string): Promise<SavedDeal | null> => {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('name', name)
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

