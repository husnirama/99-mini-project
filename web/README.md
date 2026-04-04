# MINI PROJECT

## UI PARTS

directory structure : feature based
shadcn ui

link ui from google sticth : https://stitch.withgoogle.com/projects/13584918531067192384

### 2.1. User Authentication and Authorization (2 point)

- [x] Account Creation: Customers must create an account to attend events
- [x] Roles: There are two roles: customer and event organizer
- [x] Referral Registration: Customers can register using a referral number
- [x] Referral Generation: Referral numbers are generated for new users and cannot be changed
- [x] Role-Based Access: Protect pages based on user roles.

### 1.1 Event Discovery, Details, Creation, and Promotion (4 point)

- [x] Landing Page: Display a list of upcoming events.
- [x] Event Browsing: Customers can browse events, filter by category/location, and view event details.
- [x] Search Bar: Implement a search bar with debounce functionality.
- [x] Responsiveness is a must.
- [x] Event Creation: Event organizers can create events with details such as name, price, start date, end date, available seats, description, ticket types (if applicable), etc.
- [x] Pricing: Events can be free or paid. If paid, customers are charged accordingly.
- [x] Promotions: Event organizers can create limited-time voucher promotions specific to events, with defined start and end dates.

### 1.2 Event Transaction (4 point)

- [x] Purchasing: Customers can create transactions to buy event tickets.
- [ ] Transaction Statuses: There are six statuses: waiting for payment, waiting for admin confirmation, done, rejected, expired and canceled.
- [ ] Payment Proof: After choosing a ticket and checking out, a 2-hour countdown is shown for uploading the payment proof.
- [ ] Automatic Status Changes: Transactions expire if no payment proof is uploaded within 2 hours. If the organizer doesn't accept/reject within 3 days, the transaction is automatically canceled.
- [ ] Rollbacks and Seat Restoration: Points, vouchers, or coupons used in transactions are returned if the transaction is canceled or expired. Additionally, available seats are restored
- [ ] Point Usage: Customers can use points to reduce payment amounts.(ex: event tickets price is IDR 300.000 while your points balance is 20.000, you could use it and get IDR 280.000 as the final price)
- [x] Uses only IDR in each prices of items

## Task for 07032026:

### 1. Event Creation Page

- [x] Embed google API on UI Location
- [x] Clear Add tier button
- [x] Create Another Ticket Type working function
- [x] Add logic on TnC
- [x] Add costumer form who want to buy the ticket event
- [x] Create draft button when host create an event
- [x] Create Event PIC Contact Form
- [x] Adding Voucher Promotions card that can be used by Customer
- [x] Connect to our DB

## Task for 08032026:

### 4. Event Detail

- [x] Create Event Detail Page
- [x] Get all Event info detail from DB

### 2. Home Page

- [x] Applied searchBar Function on HomePage (debounce)
- [x] Applied eventBrowsing Function on HomePage
- [x] Connect all the events on landing page with db

## Task for 19032026:

### 3. Event Transaction Page

- [x] Purchasing: Customers can create transactions to buy event tickets.
- [x] Transaction Statuses: There are six statuses: waiting for payment, waiting for admin confirmation, done, rejected, expired and canceled.
- [x] Payment Proof: After choosing a ticket and checking out, a 2-hour countdown is shown for uploading the payment proof.
- [x] Automatic Status Changes: Transactions expire if no payment proof is uploaded within 2 hours. If the organizer doesn't accept/reject within 3 days, the transaction is automatically canceled.
- [x] Rollbacks and Seat Restoration: Points, vouchers, or coupons used in transactions are returned if the transaction is canceled or expired. Additionally, available seats are restored
- [ ] Point Usage: Customers can use points to reduce payment amounts.(ex: event tickets price is IDR 300.000 while your points balance is 20.000, you could use it and get IDR 280.000 as the final price)

## Task for 23032026

### 4. Event Organizer

- [ ] Dashboard Access: Organizers can view and manage their events ( ex: edit events, etc.), transactions, and basic statistics.
- [ ] Statistics Visualization: Display event data in graphical visualizations and reports by year, month, and day.
- [ ] Transaction Management: Organizers can accept, reject, and view user payment proofs.
- [ ] Notification Emails: Customers receive email notifications when their transaction is accepted or rejected. Ensure points/vouchers/coupons are returned if used in rejected transactions. Additionally, available seats are restored.
- [ ] Attendee List: Show the list of attendees for each event, including name, ticket quantity, and total price paid.
