# 📊 Event Management Platform

## Project Monitoring & Sprint Checklist

This document tracks development progress for the **Event Management Platform MVP**.

---

# 🎯 Project Scope Overview

The MVP must include:

- Event discovery & filtering
- Event creation & promotion
- Ticket purchasing & transaction system
- Voucher & coupon system
- Referral & point expiration system
- Organizer dashboard with statistics
- Reviews & ratings
- Protected routes
- SQL transactional integrity
- Unit testing for core flows

---

# 🗓️ Sprint Roadmap

---

# 🧱 Sprint 1 – Project Setup & Architecture

### 🎯 Goal: Foundation & Infrastructure

#### ✅ Setup

- [ ] Initialize repository
- [ ] Setup folder structure
- [ ] Setup environment variables
- [ ] Setup database (Postgres - Supabase)
- [ ] Create ERD
- [ ] Create initial migrations
- [ ] Seed dummy data

#### 🔐 Authentication

- [ ] User registration
- [ ] Login
- [ ] Password hashing
- [ ] JWT authentication
- [ ] Role-based middleware -> Still Exploring
- [ ] Protected routes implementation

#### 🧪 Tests

- [ ] Auth unit tests
- [ ] Role middleware test

---

# 🏠 Sprint 2 – Event Module

### 🎯 Goal: Event browsing & management

#### 🎟️ Event CRUD

- [ ] Create event (Organizer only)
- [ ] Edit event
- [ ] Delete event
- [ ] Upload event image
- [ ] Category management

#### 🔍 Discovery

- [ ] Landing page event list
- [ ] Filtering (category/location)
- [ ] Debounced search bar
- [ ] Pagination
- [ ] Empty state handling

#### 📱 UI

- [ ] Responsive design
- [ ] Mobile layout verified
- [ ] Confirmation popup for modification

#### 🧪 Tests

- [ ] Event CRUD test
- [ ] Search debounce test

---

# 💳 Sprint 3 – Transaction & Payment Flow

### 🎯 Goal: Full purchase lifecycle

#### 🛒 Checkout Flow

- [ ] Create transaction
- [ ] Add transaction items
- [ ] Apply voucher
- [ ] Apply coupon
- [ ] Apply points
- [ ] Calculate final price (IDR only)

#### ⏳ Expiration Logic

- [ ] 2-hour payment upload deadline
- [ ] 3-day organizer response deadline
- [ ] Cron / background job for expiration

#### 📤 Payment Proof

- [ ] Upload proof
- [ ] Change status → WAITING_ADMIN_CONFIRMATION

#### 🔄 Auto Rollback

- [ ] Restore seats on cancel/expire
- [ ] Restore points
- [ ] Restore coupon state
- [ ] Restore voucher usage

#### 🧪 Tests

- [ ] Transaction lifecycle test
- [ ] Expiration logic test
- [ ] Rollback consistency test
- [ ] SQL transaction atomicity test

---

# 🎁 Sprint 4 – Referral & Reward System

### 🎯 Goal: Reward & expiration system

#### 🔢 Referral

- [ ] Generate referral code (immutable)
- [ ] Register with referral
- [ ] Grant coupon to new user
- [ ] Grant 10,000 points to referrer

#### 🪙 Points

- [ ] Implement ledger-based point system
- [ ] Expiration after 3 months
- [ ] Deduct points on usage
- [ ] Restore on transaction cancel

#### 🎟️ Coupons

- [ ] Assign system coupon
- [ ] Coupon expiration logic
- [ ] Mark used / expired states

#### 🧪 Tests

- [ ] Referral reward test
- [ ] Point expiration test
- [ ] Coupon expiration test

---

# ⭐ Sprint 5 – Reviews & Attendance

### 🎯 Goal: Post-event interaction

#### 👥 Attendance

- [ ] Create attendee record when transaction DONE
- [ ] Restrict review access until attendance confirmed

#### 📝 Reviews

- [ ] Create review
- [ ] One review per transaction
- [ ] Show average rating on organizer profile

#### 🧪 Tests

- [ ] Review eligibility test
- [ ] Review uniqueness constraint test

---

# 📊 Sprint 6 – Organizer Dashboard

### 🎯 Goal: Business visibility & management

#### 📈 Statistics

- [ ] Revenue aggregation
- [ ] Ticket sales aggregation
- [ ] Filter by:
  - [ ] Year
  - [ ] Month
  - [ ] Day

- [ ] Graph visualization

#### 📄 Transaction Management

- [ ] View payment proof
- [ ] Accept transaction
- [ ] Reject transaction
- [ ] Email notification on status change

#### 📋 Attendee List

- [ ] Display name
- [ ] Ticket quantity
- [ ] Total paid

#### 🧪 Tests

- [ ] Dashboard query test
- [ ] Email trigger test

---

# 🧪 Sprint 7 – Hardening & QA

### 🎯 Goal: Production readiness

- [ ] Edge case testing
- [ ] Concurrent seat booking testing
- [ ] Race condition testing
- [ ] Performance optimization
- [ ] DB index optimization
- [ ] Error handling standardization
- [ ] Logging implementation
- [ ] Security audit

---

# 📌 Technical Monitoring Checklist

### 🔐 Security

- [ ] Password hashing
- [ ] JWT expiration
- [ ] Role validation on each protected route
- [ ] SQL injection prevention
- [ ] File upload validation

### ⚙️ Data Consistency

- [ ] All multi-step operations use SQL transactions
- [ ] No negative seat values
- [ ] No double coupon usage
- [ ] No negative point balance
- [ ] Transaction status always valid enum

### 📧 Email

- [ ] Accept email
- [ ] Reject email
- [ ] Proper SMTP configuration

- 🧪 Test coverage tracking file
- 🐳 Docker + CI/CD monitoring README
- 📈 Production observability setup guide

# Reference :

- Components : https://ui.shadcn.com/

- Full UI Design (beta) :
  - https://stitch.withgoogle.com/projects/13584918531067192384
  - https://www.figma.com/make/yxau9zafyo66Fl6HxM53yr/Event-Management-Platform-MVP?t=yqo1ATdRlWg2u7q0-1

# Notes :

- This project will follow monorepo file structure -> one repo for frontend and backend

## Design prototype
- figma : https://www.figma.com/make/1D5T5VaYD3BBnh7b2Ifi2D/Event-Management-Platform-Prototype?t=zeOapZgtZ41aIZVv-1
