# MINI PROJECT

link ui from google sticth : https://stitch.withgoogle.com/projects/13584918531067192384

## FEATURE 1

### 1 Event Discovery, Details, Creation, and Promotion (4 point)

- [x] Landing Page: Display a list of upcoming events
- [x] Event Browsing: Customers can browse events, filter by category/location, and view event details.
- [x] Search Bar: Implement a search bar with debounce functionality.
- [x] Responsiveness is a must.
- [x] Event Creation: Event organizers can create events with details such as name, price, start date, end date, available seats, description, ticket types (if applicable), etc.
- [x] Pricing: Events can be free or paid. If paid, customers are charged accordingly.
- [x] Promotions: Event organizers can create limited-time voucher promotions specific to events, with defined start and end dates.

### 1.2 Event Transaction (4 point)

- [x] Purchasing: Customers can create transactions to buy event tickets.
- [x] Transaction Statuses: There are six statuses: waiting for payment, waiting for admin confirmation, done, rejected, expired and canceled.
- [x] Payment Proof: After choosing a ticket and checking out, a 2-hour countdown is shown for uploading the payment proof.
- [x] Automatic Status Changes: Transactions expire if no payment proof is uploaded within 2 hours. If the organizer doesn't accept/reject within 3 days, the transaction is automatically canceled.
- [x] Rollbacks and Seat Restoration: Points, vouchers, or coupons used in transactions are returned if the transaction is canceled or expired. Additionally, available seats are restored
- [ ] Point Usage: Customers can use points to reduce payment amounts.(ex: event tickets price is IDR 300.000 while your points balance is 20.000, you could use it and get IDR 280.000 as the final price)
- [x] Uses only IDR in each prices of items

### 1.3 Event Reviews and Ratings (2 point)

- [ ] Reviews: Customers can leave reviews and ratings only after attending the event.
- [ ] Organizer Profile: Show ratings and reviews on the event organizer's profile.

## FEATURE 2

### 1. User Authentication and Authorization (2 point)

- [x] Account Creation: Customers must create an account to attend events
- [x] Roles: There are two roles: customer and event organizer
- [x] Referral Registration: Customers can register using a referral number
- [x] Referral Generation: Referral numbers are generated for new users and cannot be changed
- [x] Role-Based Access: Protect pages based on user roles.

### 2. Referral System, Profile, and Prizes (4 point)

<<<<<<< HEAD
- [x] Referral Rewards: Users registering with a referral get a discount coupon, and the referrer gets 10,000 points.
- [x] Points Expiration: Points expire 3 months after being credited. (ex: today is 28 Dec 2023 and there are 3 people using your referral number, your balance would be 30.000 and available until 28 March 2024.
- [x] Coupon Expiration: Discount coupons after registering with referral are valid for 3 months.
- [ ] Profile: Customers and Event organizers can edit their profiles, including updating their profile picture, changing their password, and resetting their password if forgotten.
=======
- [ ] Referral Rewards: Users registering with a referral get a discount coupon, and the referrer gets 10,000 points.
- [ ] Points Expiration: Points expire 3 months after being credited. (ex: today is 28 Dec 2023 and there are 3 people using your referral number, your balance would be 30.000 and available until 28 March 2024.
- [ ] Coupon Expiration: Discount coupons after registering with referral are valid for 3 months.
- [x] Profile: Customers and Event organizers can edit their profiles, including updating their profile picture, changing their password, and resetting their password if forgotten.
>>>>>>> d814dc9e2277622fef8c5d70512b4f2fa988d592

### 3. Event Management Dashboard (4 point)

- [x] Dashboard Access: Organizers can view and manage their events ( ex: edit events, etc.), transactions, and basic statistics.
- [x] Statistics Visualization: Display event data in graphical visualizations and reports by year, month, and day.
- [x] Transaction Management: Organizers can accept, reject, and view user payment proofs.
- [ ] Notification Emails: Customers receive email notifications when their transaction is accepted or rejected. Ensure points/vouchers/coupons are returned if used in rejected transactions. Additionally, available seats are restored.
- [x] Attendee List: Show the list of attendees for each event, including name, ticket quantity, and total price paid.
