import { WishlistItem, UserProfile } from '../types/candle';

const GUEST_KEY = 'laura_guest_wishlist_session';
const ACTIVE_USER_KEY = 'laura_active_user';
const USERS_LIST_KEY = 'laura_registered_users';

export function getGuestWishlist(): WishlistItem[] {
  try {
    const data = sessionStorage.getItem(GUEST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to read guest wishlist', e);
    return [];
  }
}

export function saveGuestWishlist(items: WishlistItem[]): void {
  try {
    sessionStorage.setItem(GUEST_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save guest wishlist', e);
  }
}

export function getRegisteredWishlist(email: string): WishlistItem[] {
  try {
    const key = `laura_wishlist_${email.toLowerCase().trim()}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to read registered wishlist', e);
    return [];
  }
}

export function saveRegisteredWishlist(email: string, items: WishlistItem[]): void {
  try {
    const key = `laura_wishlist_${email.toLowerCase().trim()}`;
    localStorage.setItem(key, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save registered wishlist', e);
  }
}

export function getStoredActiveUser(): UserProfile | null {
  try {
    const data = localStorage.getItem(ACTIVE_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to read active user', e);
    return null;
  }
}

export function saveActiveUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
      // Also register in users list if not present
      const usersRaw = localStorage.getItem(USERS_LIST_KEY);
      const users: UserProfile[] = usersRaw ? JSON.parse(usersRaw) : [];
      if (!users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
        users.push(user);
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
      }
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY);
    }
  } catch (e) {
    console.error('Failed to save active user', e);
  }
}

export function mergeWishlists(guestItems: WishlistItem[], registeredItems: WishlistItem[]): WishlistItem[] {
  const merged = [...registeredItems];
  for (const gItem of guestItems) {
    const alreadyExists = merged.some(mItem => {
      if (mItem.type === 'standard' && gItem.type === 'standard') {
        return mItem.productId === gItem.productId;
      }
      if (mItem.type === 'bespoke' && gItem.type === 'bespoke') {
        return mItem.bespokeConfig?.customTitle === gItem.bespokeConfig?.customTitle &&
               mItem.bespokeConfig?.vesselId === gItem.bespokeConfig?.vesselId;
      }
      return false;
    });

    if (!alreadyExists) {
      merged.push(gItem);
    }
  }
  return merged;
}
