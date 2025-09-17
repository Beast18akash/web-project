import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { activatePremium } from '../store/slices/membershipSlice'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { toast } from '../hooks/use-toast'

const PremiumMembership = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { benefits, isPremium, memberSince, nextRenewal, savingsThisYear } = useSelector(
    (state) => state.membership
  )

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      // Simulating payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch(activatePremium())
      toast({
        title: 'Welcome to Premium!',
        description: 'You now have access to exclusive benefits.',
      })
    } catch (error) {
      toast({
        title: 'Subscription Failed',
        description: 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Premium Membership</h1>
      
      {isPremium ? (
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Premium Benefits</h2>
            <div className="space-y-4">
              <p><span className="font-medium">Member since:</span> {formatDate(memberSince)}</p>
              <p><span className="font-medium">Next renewal:</span> {formatDate(nextRenewal)}</p>
              <p><span className="font-medium">Savings this year:</span> ${savingsThisYear.toFixed(2)}</p>
            </div>
          </Card>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Unlock Premium Benefits</h2>
            <p className="text-gray-600">Get exclusive access to premium features and savings</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit) => (
              <Card key={benefit.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {/* Icon component would go here */}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="mb-6">
              <p className="text-3xl font-bold">$99/year</p>
              <p className="text-gray-600">Cancel anytime</p>
            </div>
            <Button
              size="lg"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PremiumMembership