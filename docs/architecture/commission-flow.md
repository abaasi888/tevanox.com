
### `tevanox.com/docs/architecture/commission-flow.md`

```markdown
# 📊 Commission Flow

## Commission Structure

### Network Marketing Model
┌─────────────────────────────────────────────────────────────┐
│ SUBSCRIPTION PAYMENT │
│ 20,000 UGX │
├─────────────────────────────────────────────────────────────┤
│ │
│ Tevanox (Platform): 12,000 UGX (60%) │
│ │
│ Level 1 Agent: 5,000 UGX (25%) │
│ Level 2 Agent: 2,000 UGX (10%) │
│ Level 3 Agent: 1,000 UGX (5%) │
│ │
│ Network Total: 8,000 UGX (40%) │
│ │
└─────────────────────────────────────────────────────────────┘

## Commission Calculation

### Example Calculation

```python
def calculate_commission(subscription_amount: float, agent_level: int) -> float:
    rates = {
        1: 0.25,  # 25%
        2: 0.10,  # 10%
        3: 0.05   # 5%
    }
    
    return subscription_amount * rates.get(agent_level, 0)

# Example:
# Level 1: 20,000 * 0.25 = 5,000 UGX
# Level 2: 20,000 * 0.10 = 2,000 UGX
# Level 3: 20,000 * 0.05 = 1,000 UGX

Monthly Commission Processing
python
async def process_monthly_commissions():
    """Process monthly commission payouts"""
    
    # Get all active agents
    agents = await get_active_agents()
    
    for agent in agents:
        # Calculate commission
        commission = calculate_agent_commission(agent.id)
        
        # Update wallet
        await update_agent_wallet(agent.id, commission)
        
        # Record transaction
        await record_commission_transaction(agent.id, commission)
Agent Tiers
Tier	Users	Rate	Bonus
1	0-100	15%	0
2	101-500	12%	50,000
3	501-999	10%	100,000
4	1000+	8%	200,000
Commission Eligibility
Agents must have an active monthly subscription to earn commissions.

python
async def check_eligibility(agent_id: str) -> bool:
    """Check if agent is eligible for commissions"""
    subscription = await db.subscriptions.find_one({
        "user_id": agent_id,
        "plan": "monthly",
        "is_active": True,
        "end_date": {"$gt": datetime.utcnow()}
    })
    
    return subscription is not None
Payout Process
Monthly Calculation - Commissions calculated on the 1st of each month

Payout Request - Agent requests withdrawal

Approval - Admin reviews and approves

Payment - Funds transferred to agent's bank account

Confirmation - Agent receives confirmation

Commission Tracking
javascript
// agent_commissions collection
{
  _id: ObjectId,
  agent_id: ObjectId,
  month: string,           // YYYY-MM
  total_active_users: number,
  commission_amount: number,
  bonus_amount: number,
  total_paid: number,
  status: 'pending' | 'paid',
  created_at: Date,
  paid_at: Date
}