
### `tevanox.com/docs/architecture/payment-flow.md`

```markdown
# 💳 Payment Flow

## Payment Process

```mermaid
sequenceDiagram
    User->>WebApp: Select subscription plan
    WebApp->>API: Initialize payment
    API->>Paystack: Create transaction
    Paystack-->>API: Return payment URL
    API-->>WebApp: Return payment URL
    WebApp->>Paystack: Redirect to payment
    Paystack->>User: Complete payment
    Paystack->>API: Webhook notification
    API->>API: Verify payment
    API->>User: Activate subscription

    Payment Methods
Mobile Money
User selects Mobile Money

Enters phone number

Selects provider (MTN, Airtel, Africell)

Receives payment request on phone

Confirms with PIN

Subscription activated

Visa / Credit Card
User selects Visa/Credit Card

Enters card details

Completes 3D Secure verification

Payment processed

Subscription activated

Paystack Integration
Initialize Payment
python
def initialize_payment(email, amount, metadata):
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "email": email,
        "amount": int(amount * 100),
        "reference": generate_reference(),
        "metadata": metadata
    }
    
    response = requests.post(
        "https://api.paystack.co/transaction/initialize",
        json=data,
        headers=headers
    )
    
    return response.json()
Verify Payment
python
def verify_payment(reference):
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}"
    }
    
    response = requests.get(
        f"https://api.paystack.co/transaction/verify/{reference}",
        headers=headers
    )
    
    return response.json()
Webhook Handling
python
@app.post("/webhooks/paystack")
async def paystack_webhook(request: Request):
    data = await request.json()
    
    if data["event"] == "charge.success":
        reference = data["data"]["reference"]
        # Activate subscription
        await activate_subscription(reference)
    
    return {"status": "success"}
Commission Flow

graph LR
    SUB[Subscription Payment] --> AGENT[Agent Commission]
    SUB --> TEVANOX[Tevanox Revenue]
    AGENT --> WALLET[Agent Wallet]
    AGENT --> REFERRAL[Referral Tracking]
    WALLET --> WITHDRAW[Withdrawal Request]
    WITHDRAW --> PAYOUT[Agent Payout]

  Commission Calculation
Agent Commission Structure
Level	Rate	Description
Level 1	25%	Direct referral
Level 2	10%	Second level
Level 3	5%	Third level
Total	40%	Network total
Commission Calculation Example
python
def calculate_commission(subscription_amount: float, level: int) -> float:
    rates = {
        1: 0.25,  # 25%
        2: 0.10,  # 10%
        3: 0.05   # 5%
    }
    
    return subscription_amount * rates.get(level, 0)
Payment Security
SSL/TLS encryption

PCI DSS compliance

No card data storage

Paystack handles sensitive data

Webhook signature verification 