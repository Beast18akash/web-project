import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isPremium: false,
  benefits: [
    {
      id: 1,
      title: 'Free Next-Day Delivery',
      description: 'Get your items delivered the next day at no extra cost',
      icon: 'Truck'
    },
    {
      id: 2,
      title: 'Exclusive Deals',
      description: 'Access to member-only deals and early sale access',
      icon: 'Tag'
    },
    {
      id: 3,
      title: 'Premium Support',
      description: '24/7 priority customer support',
      icon: 'Headphones'
    },
    {
      id: 4,
      title: 'Special Discounts',
      description: 'Additional 5% off on all purchases',
      icon: 'Percent'
    }
  ],
  memberSince: null,
  nextRenewal: null,
  savingsThisYear: 0
}

const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    activatePremium: (state) => {
      state.isPremium = true
      state.memberSince = new Date().toISOString()
      // Set next renewal date to 1 year from now
      const nextYear = new Date()
      nextYear.setFullYear(nextYear.getFullYear() + 1)
      state.nextRenewal = nextYear.toISOString()
    },
    deactivatePremium: (state) => {
      state.isPremium = false
      state.memberSince = null
      state.nextRenewal = null
      state.savingsThisYear = 0
    },
    updateSavings: (state, action) => {
      state.savingsThisYear += action.payload
    }
  }
})

export const { activatePremium, deactivatePremium, updateSavings } = membershipSlice.actions
export default membershipSlice.reducer